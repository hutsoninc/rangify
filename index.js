'use strict';

const validRangeRegex = /^(\d+)(-(\d+))?$/;

module.exports = (input, opts) => {

    opts = {
        sort: true,
        filter: true,
        ...opts
    }

    // Output array
    let range = [];

    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }

    // Remove extra spaces and filter
    let ranges = input.replace(/\s/g, '')
        .split(',')
        .filter(str => (
            str !== null &&
            str !== undefined &&
            str !== ''
        ));

    ranges.forEach(str => {
        // Validate format
        if (!validRangeRegex.test(str)) {
            throw new Error(`Invalid range format: ${str}`);
        }

        let arr = str.split('-');

        // Check if first number is less than the second number
        if (arr.length === 2 && Number(arr[0]) >= Number(arr[1])) {
            throw new Error(`First number in range should be smaller than the second: ${str}`);
        }

        // Check if is safe integer
        if (!Number.isSafeInteger(Number(arr[0]))) {
            throw new Error(`Value is not a safe integer: ${arr[0]}`);
        }

        if (arr.length === 2 && !Number.isSafeInteger(Number(arr[1]))) {
            throw new Error(`Value is not a safe integer: ${arr[1]}`);
        }

        // Push to output array
        if (arr.length === 2) {
            for (let i = Number(arr[0]); i <= arr[1]; i++) {
                range.push(i);
            }
        } else {
            range.push(Number(arr[0]));
        }
    });

    // Sort output array
    if (opts.sort) {
        range = range.sort((a, b) => {
            return a - b;
        });
    }

    // Filter duplicates from output array
    if (opts.filter) {
        range = Array.from(new Set(range));
    }

    return range;

}
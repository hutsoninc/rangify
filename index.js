'use strict';

const validRangeRegex = /^(\d+)(-(\d+))?$/;

module.exports = (input, opts) => {

    if(typeof input !== 'string') {
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
        if(!validRangeRegex.test(str)) {
            throw new Error(`Invalid range format: ${str}`);
        }

        // Check if first number is less than the second number
        let arr = str.split('-');

        if(Number(arr[0]) >= Number(arr[1])) {
            throw new Error(`First number in range should be smaller than the second: ${str}`);
        }
    });

    return ranges;

}
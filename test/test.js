const rangify = require('../');

describe('Should create array from string', () => {

    test('Single number', () => {
        let arr = rangify('1');
        expect(arr).toContain(1);
    });

    test('Single range', () => {
        let results = [1, 2, 3, 4, 5];
        let arr = rangify('1-5');
        results.forEach(result => {
            expect(arr).toContain(result);
        });
    });

    test('Multiple ranges', () => {
        let results = [1, 2, 3, 4, 5, 7, 8];
        let arr = rangify('1-5,7-8');
        results.forEach(result => {
            expect(arr).toContain(result);
        });
    });

    test('Mixed inputs', () => {
        let results = [1, 2, 11, 24, 26, 41, 60, 100, 301, 2000, 2010];
        let arr = rangify('1-11,24,26-60,100-2000,2010');
        results.forEach(result => {
            expect(arr).toContain(result);
        });
    });

    test('Mixed inputs with spaces', () => {
        let results = [1, 2, 11, 24, 26, 41, 60];
        let arr = rangify('1 - 11, 24, 26 - 60');
        results.forEach(result => {
            expect(arr).toContain(result);
        });
    });

});

describe('Should modify resulting array given options', () => {

    test('Sorted', () => {
        let results = [1, 2, 3, 7, 8, 9];
        let arr = rangify('7-9,1-3'); // sorted by default
        results.forEach((result, index) => {
            expect(arr[index]).toEqual(result);
        });
    });

    test('Unsorted', () => {
        let results = [7, 8, 9, 1, 2, 3];
        let arr = rangify('7-9,1-3', { sort: false });
        results.forEach((result, index) => {
            expect(arr[index]).toEqual(result);
        });
    });

    test('Sorted and filtered', () => {
        let results = [3, 4, 5, 6, 7, 8, 9];
        let arr = rangify('5-9,3-7'); // sorted and filtered by default
        results.forEach((result, index) => {
            expect(arr[index]).toEqual(result);
        });
    });

    test('Unsorted and unfiltered', () => {
        let results = [5, 6, 7, 8, 9, 3, 4, 5, 6, 7];
        let arr = rangify('5-9,3-7', { sort: false, filter: false });
        results.forEach((result, index) => {
            expect(arr[index]).toEqual(result);
        });
    });

});

describe('Should throw errors', () => {

    test('Invalid formatting', () => {
        let range = '1-';
        expect(() => {
            rangify(range);
        }).toThrowError(`Invalid range format: ${range}`);
    });

    test('Invalid formatting', () => {
        let range = '1-,3';
        expect(() => {
            rangify(range);
        }).toThrowError(`Invalid range format: 1-`);
    });

    test('Invalid formatting', () => {
        let range = '1-2-3';
        expect(() => {
            rangify(range);
        }).toThrowError(`Invalid range format: ${range}`);
    });

    test('First number is larger than second', () => {
        let range = '30-21';
        expect(() => {
            rangify(range);
        }).toThrowError(`First number in range should be smaller than the second: ${range}`);
    });

    test('First number is same as second', () => {
        let range = '30-30';
        expect(() => {
            rangify(range);
        }).toThrowError(`First number in range should be smaller than the second: ${range}`);
    });

});
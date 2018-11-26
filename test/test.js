const rangify = require('../');

describe('Should create array from string', () => {

    test('Single number', () => {
        let arr = rangify('1');
        expect(arr).toContain('1');
    });

    test('Single range', () => {
        let arr = rangify('1-5');
        expect(arr).toContain('1-5');
    });

    test('Multiple ranges', () => {
        let arr = rangify('1-5,7-8');
        expect(arr).toContain('1-5');
        expect(arr).toContain('7-8');
    });

    test('Mixed inputs', () => {
        let arr = rangify('1-11,24,26-60,100-2000,2010');
        expect(arr).toContain('1-11');
        expect(arr).toContain('24');
        expect(arr).toContain('26-60');
        expect(arr).toContain('100-2000');
        expect(arr).toContain('2010');
    });

    test('Mixed inputs with spaces', () => {
        let arr = rangify('1 - 11, 24, 26 - 60');
        expect(arr).toContain('1-11');
        expect(arr).toContain('24');
        expect(arr).toContain('26-60');
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
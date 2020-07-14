const expect = require('expect');


// import isRealString
const {isRealString} = require('./validation');

    describe('isRealString', () => {
        it('should reject non-string values', () => {
            let result = isRealString(98);
            expect(result).toBe(false);
        });
        it('should reject string with only spaces', () => {
            let result = isRealString(' ');
            expect(result).toBe(false);
        });
        it('should allow string with non-space characters', () => {
            let result = isRealString('String is Real');
            expect(result).toBe(true);
        });
    });
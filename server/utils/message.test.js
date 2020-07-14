let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        const msg = {
            from: 'Aqib Alvi',
            text: 'I am an object'
        }
        let result = generateMessage(msg.from, msg.text);

        expect(result).toInclude({
            from: 'Aqib Alvi',
            text: 'I am an object'
        });
        expect(result.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'Ban';
        let latitude = 15;
        let longitude = 19;
        const url = 'https://www.google.com/maps?q=15,19';
        let message = generateLocationMessage(from, latitude, longitude);

        expect(message).toInclude({from, url});
        expect(message.createdAt).toBeA('number');
    });
});
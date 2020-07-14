const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    let usersL;

    beforeEach(() => {
        usersL = new Users();
        usersL.users = [{
            id: '1',
            name: 'Aqib',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Adil',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Ahmad',
            room: 'Node Course'
        }] 
    });

    it('Should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Aqib',
            room: 'Xeeonix Room'
        };
        let resultUser = users.addUser(user.id, user.name, user.room);
        
        expect(resultUser).toInclude(user);
    });

    it('should remove a user', () => {
        let userId = '3';
        let user = usersL.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(usersL.users.length).toBe(2);
    });

    it('should not remove user', () => {
        let userId = '99';
        let user = usersL.removeUser(userId);

        expect(user).toNotExist();
        expect(usersL.users.length).toBe(3);
    });

    it('should find user', () => {
        let userId = '1';
        let user = usersL.getUser(userId);

        expect(user.id).toBe(userId);

    });

    it('should not find user', () => {
        let userId = '7';
        let user = usersL.getUser(userId);

        expect(user).toNotExist();
    });

    it('should return names for node course', () => {
        let userList = usersL.getUserList('Node Course');

        expect(userList).toEqual(['Aqib', 'Ahmad']);
    });

    it('should return names for react course', () => {
        let userList = usersL.getUserList('React Course');

        expect(userList).toEqual(['Adil']);
    });
})
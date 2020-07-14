[{
    id: '123',
    name: 'Aqib',
    room: 'Xeeonix'
}]

// addUser(id, name, room)
// removeUser(id)
//getUser(id)
// getUserList(roomName)

class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser (id) {
        let user = this.users.filter((user) => user.id === id);
        if(user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        
        return user[0];
    }
    getUser (id) {
        let user = this.users.filter((user) => user.id === id);
        return user[0];
    }

    getUserList (room) {
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};

// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }

// let me = new Person('Aqib', 22);
// let description = me.getUserDescription();
// console.log(description); 
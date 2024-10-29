import { getdB } from "../../config/mongodb.js";

export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
  }

  // static async signUp(name, email, password, type) {
  //   try {
  //     const db = getdB();
  //     const newUser = new UserModel(
  //       name,
  //       email,
  //       password,
  //       type
  //     );
  //     const collection = db.collection('users');
  //     await collection.insertOne(newUser);
  //     // newUser.id = users.length + 1;
  //     // users.push(newUser);
  //     return newUser;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  static signIn(email, password) {
    const user = users.find(
      (u) =>
        u.email == email && u.password == password
    );
    return user;
  }

  static getAll() {
    return users;
  }
}

var users = [
  {
    id: 1,
    name: 'Seller User',
    email: 'seller@ecom.com',
    password: 'Password1',
    type: 'seller',
  },
  {
    id: 2,
    name: 'Customer User',
    email: 'customer@ecom.com',
    password: 'Password1',
    type: 'customer',
  },
];

import { getdB } from "../../config/mongodb.js";

class UserRepository {

    constructor() {
        this.collection = "users";
    }
    async signUp(newUser) {
        try {
            const db = getdB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newUser);
            // newUser.id = users.length + 1;
            // users.push(newUser);
            return newUser;
        } catch (err) {
            console.log(err);
        }
    }

    async signIn(email, password) {
        try {
            const db = getdB();
            const collection = db.collection('users');
            return await collection.findOne({ email, password });
            // newUser.id = users.length + 1;
            // users.push(newUser);
        } catch (err) {
            console.log(err);
        }
    }

    async signInByEmail(email) {
        try {
            const db = getdB();
            const collection = db.collection('users');
            return await collection.findOne({ email });
            // newUser.id = users.length + 1;
            // users.push(newUser);
        } catch (err) {
            console.log(err);
        }
    }
}

export default UserRepository;
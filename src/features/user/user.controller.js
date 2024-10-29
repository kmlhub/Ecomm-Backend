import UserModel from './user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from './user.repository.js';

export default class UserController {

  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const {
        name,
        email,
        password,
        type,
      } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new UserModel(
        name,
        email,
        hashedPassword,
        type
      );
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (err) {
      console.log(err);
    }
  }

  async signIn(req, res) {
    try {
      const user = await this.userRepository.signInByEmail(req.body.email);
      if (!user) {
        return res
          .status(400)
          .send('Incorrect Credentials');
      } else {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          const token = jwt.sign(
            {
              userID: user._id,
              email: user.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '1h',
            }
          );
          // 2. Send token.
          return res.status(200).send(token);
        } else {
          return res
            .status(400)
            .send('Incorrect Credentials');
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

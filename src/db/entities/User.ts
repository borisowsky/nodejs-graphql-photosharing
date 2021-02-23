import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getAuthenticatedUserObject } from '@app/graphql/errors/authentication';

import { Photo } from './Photo';
import { Comment } from './Comment';

interface JWTPayload {
  id: number;
  email: string;
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  setEmail = (email: string) => {
    this.email = email.toLowerCase();
  };

  setPassword = (password: string) => {
    const hashedPassword = bcrypt.hashSync(password, 10);

    this.password = hashedPassword;
  };

  static comparePasswords = (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword);
  };

  static generateToken = (payload: JWTPayload) => {
    return jwt.sign(
      { id: payload.id, email: payload.email },
      process.env.JWT_SECRET,
    );
  };

  static authenticate = async (email: string, password: string) => {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ where: { email: normalizedEmail } });

    if (user) {
      const isPasswordsEqual = User.comparePasswords(password, user.password);

      if (isPasswordsEqual) {
        return getAuthenticatedUserObject(user);
      }

      throw new Error('Wrong password');
    }

    throw new Error(`There is no user with email ${email}`);
  };
}

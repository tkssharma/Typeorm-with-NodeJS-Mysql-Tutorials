
import { UserService } from '../services/UserService';
import Template from '../global/response';
import { ServerException } from '../../lib/custom-errors';
import APIError from '../global/response/apierror';
const service = new UserService();
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { createQueryBuilder, getRepository, ReplSet } from 'typeorm';
import { User } from '../modules/entities/User';
import { NextFunction } from 'express-serve-static-core';

class UserController {
  public static listAll = async (req: Request, res: Response, next: NextFunction) => {
     const UserRepo = getRepository(User);
     try {
       const users = await UserRepo.createQueryBuilder('user')
       .leftJoinAndSelect('user.posts','post')
       .leftJoinAndSelect('user.comment', 'comment')
       .getMany();
       res.send(users);

     }catch(err){
       next(err)
     }
  };

  public static getOneById = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.posts','post')
      .leftJoinAndSelect('user.comment', 'comment')
      .where('user.id = :id', { id })
      .getOne();
      res.send(user);
    }catch(err){
      next(err)
    }
  };

  public static newUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
    const user = new User();
    user.username = username;
    user.password = password;
    const errors = await validate(user);
    user.hashPassword();
    if(errors.length > 0){
      res.send(errors);
      return;
    }
    const userRepository = getRepository(User);
    const newUser = await userRepository.save(user);
    res.send(newUser);
  } catch(err){
    next(err);
  }
  };

  public static editUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const username = req.body.username;
    const userRepository = getRepository(User);
    let user = null;
    try {
       user = await userRepository.findOneOrFail(id);
    }catch(err){
       res.status(404).send('user not found');
       return;
    }
    const newUser = {...user, username: username};
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('Sorry, this username already exists 😿');
      return;
    }
  };

  public static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }
    try {
    await userRepository.delete(id);
    res.status(200).send('Goodbye!');
    }catch(err){
      next(err);
    }
  };
}

export default UserController;

import { getRepository } from 'typeorm';
import { Request } from 'express';
import { User } from '../modules/entities/user';
import APIError from '../global/response/apierror';
import Err from '../global/response/errorcode';

export class UserService {

    async get(): Promise<User[] | null> {
        // Get users from database
        try {
            // get data from DB 
            return [];
        }
        catch (error) {
            throw new Error(error);
            return Promise.reject(new APIError('User Already exists', Err.EmailAlreadyExists));

        }
    }
}
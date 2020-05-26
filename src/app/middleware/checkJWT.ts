import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { IRequest } from "./Request";

  
export const checkJWT = (req: IRequest, res: Response, next: NextFunction) => {
  if(! req.headers.authorization){
      res.status(401).json({'message' : 'auth token not provided'})
  }
  const token = req!.headers!.authorization!.split(' ')[1] as String;
   let jwtPayload;
  try {
     jwtPayload = jwt.verify(token, process.env.secret) as any;
     req.payload = jwtPayload;
  }catch(err){
      res.status(401).json({'message': 'invalid token provided'});
      return;
  }
}
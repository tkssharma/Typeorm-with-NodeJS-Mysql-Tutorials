import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Post from '../entity/Post'

export const checkIsAuthor = (req: Request, res: Response, next: NextFunction) => {
  const currentUserId = res.locals.jwtPayload.userId
  getRepository(Post)
    .findOne(req.params.id)
    .then((post: Post) => {
      const authorId = post.user.id
      if (authorId === currentUserId) {
        next()
      } else {
        res.status(404).send('Sorry, you are not authorised to modify this post 😿')
      }
    })
}

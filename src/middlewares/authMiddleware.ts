import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

type TokenPayload = {
  id: number;
  iat: number;
  exp: number;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.sendStatus(401)
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    const data = jwt.verify(token, 'its a secret')

    const { id } = data as TokenPayload

    req.userId = id

    return next()
  } catch {
    return res.sendStatus(401)
  }
}
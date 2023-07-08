import { Request, Response, NextFunction } from 'express'
import { isHttpError } from '../utils/typeguards'
import { Logger } from '../utils/chalk'
import { ERROR_MESSAGES } from '../utils/consts'


export const errorMiddleware = (error: unknown, req: Request, res: Response) => {
  if (isHttpError(error)) {
    Logger.httpError(500, req.originalUrl, error.message)
    return res.send(error.message)
  }

  return res.send(ERROR_MESSAGES.UNKNOWN_ERROR)
}
/**
 * Controller contains high-level operations using services, consumed by routes
 */
import { NextFunction, Request, Response } from 'express';

import userService from '../services/user.service';
import httpStatus from 'http-status';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  
  let decodedToken: any;
  if (req.headers.authorization) {
    decodedToken = req.headers.authorization as any;
    req.body.auth_id = decodedToken.uid;
  }

  try {
    const createdUser = await userService.createUser(req.body);

    // Don't return auth_id in the response
    res.status(httpStatus.CREATED).json({
      _id: createdUser._id,
      first_name: createdUser.first_name,
      last_name: createdUser.last_name,
      persons: createdUser.persons,
      encounters: createdUser.encounters
    });

  } catch (e) {
    if (e.name === "Conflict") {
      res.status(httpStatus.CONFLICT).end();
    }
    next(e);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const auth_id = req.headers.authorization?.["user_id"];
    const user = await userService.getUserByAuthId(auth_id);

    if (!user) {
      res.status(httpStatus.NOT_FOUND).end();
    } else {
      // Don't return auth_id in the response
      res.status(httpStatus.OK).json({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        persons: user.persons,
        encounters: user.encounters
      });
    }
  
  } catch (e) {
    next(e);
  }
};
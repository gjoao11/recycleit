import { Router } from 'express'
import multer from 'multer'

import { authMiddleware } from './middlewares/authMiddleware'
import { multerConfig } from './config/multer'

import { UserController } from './controllers/UserController'
import { ItemController } from './controllers/ItemController'
import { PointController } from './controllers/PointController'

const userController = new UserController()
const itemController = new ItemController()
const pointController = new PointController()

const routes = Router()

routes.get('/users', authMiddleware, userController.index)
routes.post('/users/signup', userController.create)
routes.post('/users/signin', userController.authenticate)
routes.get('/users/recoveruserinfo', authMiddleware, userController.recoverUserInformation)
routes.get('/users/:id', authMiddleware, userController.show)
routes.get('/users/:id/points', authMiddleware, userController.listPoints)

routes.get('/items', itemController.index)
routes.get('/items/:id', itemController.show)

routes.get('/points', pointController.index)
routes.get('/points/filter', pointController.filter)
routes.put('/points/create',
  authMiddleware,
  multer(multerConfig).single('file'),
  pointController.create
)
routes.delete('/points/delete', authMiddleware, pointController.delete)
routes.put('/points/update', authMiddleware, pointController.update)
routes.get('/points/:id', pointController.show)

export { routes }

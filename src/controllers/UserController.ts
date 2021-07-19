import { Prisma, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export class UserController {
  async index(_req: Request, res: Response) {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
      },
    })

    return res.json(users)
  }

  async show(req: Request, res: Response) {
    const id = req.params.id

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
      },
    })

    if (!user) {
      return res.sendStatus(404)
    }

    return res.json(user)
  }

  async create(req: Request, res: Response) {
    const { name, lastName, email, password } = req.body

    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) {
      return res.json({ emailAlreadyRegistered: "Email already registered" })
    }

    const passwordHash = bcrypt.hashSync(password, 10)

    await prisma.user.create({
      data: {
        name,
        lastName,
        email,
        password: passwordHash,
      },
    }).catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.message)
        return res.sendStatus(400)
      }
    })

    return res.sendStatus(201)
  }

  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.sendStatus(401)
    }

    // @ts-ignore
    const isValidPassword = bcrypt.compareSync(password, user?.password)
    if (!isValidPassword) {
      return res.sendStatus(401)
    }

    const token = jwt.sign(
      { id: user?.id },
      'its a secret',
      { expiresIn: '24h' }
    )

    // @ts-ignore
    delete user?.password

    return res.json({
      user,
      token,
    })
  }

  async listPoints(req: Request, res: Response) {
    const id = req.params.id

    const points = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        points: {
          orderBy: { name: 'asc' },
        },
      },
    })

    if (!points) {
      return res.sendStatus(404)
    }

    return res.json(points)
  }
}
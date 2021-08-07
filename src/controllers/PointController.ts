import { Prisma, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export class PointController {
  async index(req: Request, res: Response) {
    const { state, city } = req.body

    const points = await prisma.point.findMany({
      where: {
        AND: {
          status: 'active',
          state,
          city,
        },
      },
    })

    return res.json(points)
  }

  async show(req: Request, res: Response) {
    const id = req.params.id

    const point = await prisma.point.findUnique({
      where: { id: Number(id) }
    })

    if (!point) {
      return res.sendStatus(404)
    }

    return res.json(point)
  }

  async create(req: Request, res: Response) {
    const { userId, itemsId } = req.body
    const {
      name,
      email,
      whatsapp,
      state,
      city,
      district,
      street,
      number,
      latitude,
      longitude,
      cpfOrCnpj,
    }: Prisma.PointCreateInput = req.body

    await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        points: {
          create: {
            name,
            email,
            whatsapp,
            state,
            city,
            district,
            street,
            number,
            latitude,
            longitude,
            cpfOrCnpj,
            items: {
              connect: itemsId.map((id: number) => ({ id })),
            },
          },
        },
      },
      include: {
        points: {
          include: {
            items: true,
          },
        },
      },
    }).catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.message)
        return res.sendStatus(400)
      }
    })

    return res.sendStatus(201)
  }

  async delete(req: Request, res: Response) {
    const id = req.body

    await prisma.point.delete({
      where: id
    }).catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.message)
        return res.sendStatus(400)
      }
    })

    return res.sendStatus(200)
  }

  async update(req: Request, res: Response) {
    const {
      id,
      name,
      email,
      whatsapp,
      itemsId,
    } = req.body

    const savedItems = await prisma.point.findUnique({
      where: { id },
      select: {
        items: {
          select: {
            id: true,
          },
        },
      },
    })

    await prisma.point.update({
      where: { id },
      data: {
        name,
        email,
        whatsapp,
        items: {
          disconnect: savedItems?.items,
          connect: itemsId.map((id: number) => ({ id })),
        },
      },
    }).catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.message)
        return res.sendStatus(400)
      }
    })

    return res.sendStatus(201)
  }

  async filter(req: Request, res: Response) {
    const state = String(req.query.state)
    const city = String(req.query.city)
    const itemsId = String(req.query.itemsId).split(',').map(Number)

    if (isNaN(itemsId[0])) {
      const points = await prisma.point.findMany({
        where: {
          AND: {
            status: 'active',
            state,
            city,
          },
          items: {
            some: {
              id: {
                in: [1, 2, 3, 4, 5, 6, 7, 8, 9],
              },
            },
          },
        },
        include: {
          items: true,
        },
      })

      return res.json(points)
    }

    const points = await prisma.point.findMany({
      where: {
        AND: {
          status: 'active',
          state,
          city,
        },
        items: {
          some: {
            id: {
              in: itemsId,
            },
          },
        },
      },
      include: {
        items: true,
      },
    })

    return res.json(points)
  }

  async setImage(req: Request, res: Response) {
    const pointId = req.body.pointId
    const filePath = req.file?.path

    await prisma.point.update({
      where: { id: Number(pointId) },
      data: {
        image: filePath
      }
    }).catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.message)
        return res.sendStatus(400)
      }
    })

    return res.sendStatus(201)
  }
}
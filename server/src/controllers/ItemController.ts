import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export class ItemController {
  async index(_req: Request, res: Response) {
    const items = await prisma.item.findMany({
      orderBy: { name: 'asc' },
    })

    return res.json(items)
  }

  async show(req: Request, res: Response) {
    const id = req.params.id

    const item = await prisma.item.findUnique({ where: { id: Number(id) } })

    if (!item) {
      return res.sendStatus(404)
    }

    return res.json(item)
  }
}
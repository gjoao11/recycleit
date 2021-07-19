import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const itemData: Prisma.ItemCreateWithoutPointsInput[] = [
  { name: "Eletrônicos" },
  { name: "Madeira" },
  { name: "Metais" },
  { name: "Não recicláveis" },
  { name: "Orgânico" },
  { name: "Papéis e papelão" },
  { name: "Pilhas e baterias" },
  { name: "Plástico" },
  { name: "Vidro" },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const i of itemData) {
    const item = await prisma.item.create({
      data: i,
    })
    console.log(`Created item with name: ${item.name}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

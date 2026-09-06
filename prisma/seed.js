const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')

async function main() {
    console.log("Seeding data...")

    await prisma.role.deleteMany()
    
    await prisma.role.createMany({
        data: [
            { role_name: 'admin' },
            { role_name: 'mentor' },
            { role_name: 'student' }
        ]
    })
    
    const adminRole = await prisma.role.findFirst({
        where: { role_name: 'admin'}
    })

    const adminPassword = process.env.SEED_ADMIN_PASSWORD
    if (!adminPassword) {
        throw new Error('Set SEED_ADMIN_PASSWORD in your .env before running the seed script')
    }
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    const user = await prisma.user.create({
        data: {
            user_name: 'Admin',
            user_email: 'admin@gasetir.academy',
            user_password: hashedPassword,
            user_phone: '6280000000000',
            id_role: adminRole.id
        }
    })

    console.log("Data seeded successfully!")
}

main()
    .catch((e) => {
        console.error("Error seeding data: ",e)
        process.exit(1)
    })
    .finally(async() => {
        await prisma.$disconnect()
    })
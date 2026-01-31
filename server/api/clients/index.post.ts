import { db } from '../../utils/db'
import { clients } from '../../database/schema'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.name || !body.email) {
        throw createError({ statusCode: 400, message: 'Name and email are required' })
    }

    const [newClient] = await db
        .insert(clients)
        .values({
            name: body.name,
            email: body.email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(body.name)}`,
            status: 'active'
        })
        .returning()

    return newClient
})

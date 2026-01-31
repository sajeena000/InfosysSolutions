import { db } from '../../utils/db'
import { clients } from '../../database/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async () => {
    const clientsList = await db
        .select()
        .from(clients)
        .orderBy(desc(clients.createdAt))

    return clientsList
})

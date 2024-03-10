import { PrismaClient } from "@prisma/client"
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[4];
    const prisma = new PrismaClient();
    const profilePosts = await prisma.posts.findMany({
        include: {
            user: true,
            comments: true
        },
        where: {
            user_id: Number(profileUserId)
        }
    });
    return new Response(JSON.stringify(profilePosts));
}
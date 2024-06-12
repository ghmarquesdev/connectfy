import { prisma } from "@/lib/prisma";
import { FollowsRepository } from "../follow";

export class FollowPrismaRepository implements FollowsRepository {
  async create(data: { followedId: string; userId: string; }) {
    const follow = await prisma.follow.create({
      data,
    })

    return follow
  }

  async findManyFollowers(userId: string) {
    const followers = await prisma.follow.count({
      where: {
        followedId: userId
      }
    })

    return followers
  }
  
  async findManyFollowing(userId: string) {
    const followers = await prisma.follow.count({
      where: {
        userId
      }
    })

    return followers
  }

  async findByFollowedIdAndUserId({ followedId, userId }: { followedId: string; userId: string; }) {
    const follow = await prisma.follow.findUnique({
      where: {
        userId_followedId: {
          followedId, userId
        }
      }
    })

    return follow
  }

  async removeFollow({ followedId, userId }: { followedId: string; userId: string; }) {
    const follow = await prisma.follow.delete({
      where: {
        userId_followedId: {
          followedId, userId
        }
      }
    })

    return follow ? true : false
  }

}
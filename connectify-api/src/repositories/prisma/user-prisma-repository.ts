import { User, UsersRepository } from "../../entities/user";
import { prisma } from "@/lib/prisma";

export class UserPrismaRepository implements UsersRepository {
  async create({ email, name, nickname, password }: User.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        nickname,
        password
      },
    });

    return user;
  }

  async countAllUsers(query: string) {
    const userCount = await prisma.user.count(
      { where: { nickname: { contains: query } } }
    )

    return userCount
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findFirst({ where: { id } });

    return user;
  }

  async findByNickName(nickname: string) {
    const user = await prisma.user.findUnique({ where: { nickname } });

    return user;
  }

  async searchMany(page: number, query: string, userId: string) {
    const user = await prisma.user.findMany({
      where: { nickname: { contains: query }, NOT: { id: userId } },
      take: 10,
      skip: (page - 1) * 10,
    });

    return user;
  }

  async updateUser(userId: string, data: User.UserCreateInput) {
    const user = await prisma.user.update({ where: { id: userId }, data });

    return user;
  }

  async findMany(page: number, userId: string) {
    const user = await prisma.user.findMany({
      where: { NOT: { id: userId } },
      take: 10,
      skip: (page - 1) * 10,
    });

    return user;
  }

  async updateUrlAvatar(fullPath: string, userId: string) {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        url_avatar: `https://wedfxjeqwrigbygcwrlw.supabase.co/storage/v1/object/public/` + fullPath
      }
    })
  }
}

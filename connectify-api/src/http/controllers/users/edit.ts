import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";
import { UserPrismaRepository } from "@/repositories/prisma/user-prisma-repository";
import { EditUserProfileUseCase } from "@/use-case/user/edit-user-profile";
import { NicknameAlreadyExistError } from "@/use-case/errors/nickname-already-exist-error";

export async function edit(req: FastifyRequest, reply: FastifyReply) {
  const editBody = z.object({
      details: z.string(),
      name: z.string(),
      nickname: z.string(),
      email: z.string(),
      password: z.string().min(6),
  });

  const { details, email, name, password, nickname } = editBody.parse(req.body);

  try {
    const userRepository = new UserPrismaRepository();
    const useCase = new EditUserProfileUseCase(userRepository);

    const { user } = await useCase.execute({
      userId: req.user.sub,
      data: { details, email, name, nickname, password },
    });

    return reply.status(201).send({ user });
  } catch (error) {
    if (error instanceof NicknameAlreadyExistError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}

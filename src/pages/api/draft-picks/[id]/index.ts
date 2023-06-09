import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { draftPickValidationSchema } from 'validationSchema/draft-picks';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.draft_pick
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDraftPickById();
    case 'PUT':
      return updateDraftPickById();
    case 'DELETE':
      return deleteDraftPickById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDraftPickById() {
    const data = await prisma.draft_pick.findFirst(convertQueryToPrismaUtil(req.query, 'draft_pick'));
    return res.status(200).json(data);
  }

  async function updateDraftPickById() {
    await draftPickValidationSchema.validate(req.body);
    const data = await prisma.draft_pick.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDraftPickById() {
    const data = await prisma.draft_pick.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

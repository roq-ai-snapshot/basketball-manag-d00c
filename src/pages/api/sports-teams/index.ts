import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { sportsTeamValidationSchema } from 'validationSchema/sports-teams';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getSportsTeams();
    case 'POST':
      return createSportsTeam();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSportsTeams() {
    const data = await prisma.sports_team
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'sports_team'));
    return res.status(200).json(data);
  }

  async function createSportsTeam() {
    await sportsTeamValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.draft_pick?.length > 0) {
      const create_draft_pick = body.draft_pick;
      body.draft_pick = {
        create: create_draft_pick,
      };
    } else {
      delete body.draft_pick;
    }
    if (body?.player?.length > 0) {
      const create_player = body.player;
      body.player = {
        create: create_player,
      };
    } else {
      delete body.player;
    }
    const data = await prisma.sports_team.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}

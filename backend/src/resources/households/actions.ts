import { db } from '../../db/db';
import { getUuid } from '../../shared/utils';
import { HouseholdModel } from '../../../prisma/zod';
import { getUser, updateUser } from '../users/actions';
import { NotFoundError } from '../../shared/errors';

export const createHousehold = async ({ userId }: { userId: string }) => {
  const householdData = { createdBy: userId, id: getUuid() };

  const user = await getUser(userId);
  if (user?.householdId) {
    throw new Error('You are already part of a household');
  }

  const res = await db.household.create({ data: householdData });

  await updateUser(res.createdBy, {
    householdId: res.id,
  });

  const newHousehold = HouseholdModel.parse(res);
  return newHousehold;
};

export const getHouseholds = async (params?: { filters?: { id?: string } }) => {
  if (params?.filters?.id) {
    const row = await db.household.findUnique({
      where: { id: params.filters.id },
    });
    const household = HouseholdModel.parse(row);
    return household;
  }
  const rows = await db.household.findMany();
  const households = rows.map((row) => HouseholdModel.parse(row));
  return households;
};

export const getHousehold = async (id: string) => {
  const household = await db.household.findUnique({ where: { id } });
  if (household) throw new Error(`Household with id: ${id} not found`);
  return household;
};

export const deleteHousehold = async (id: string) => {
  const household = await getHouseholds({ filters: { id } });
  if (!household) throw new Error('Household not found');

  await db.household.delete({
    where: {
      id,
    },
  });
  return { message: 'Household deleted successfully' };
};

export const deleteAllHouseholds = async () => {
  await db.household.deleteMany();
};

export const removeUserFromHousehold = async (
  userId: string,
  householdId: string,
) => {
  const user = await db.user.findFirst({
    where: { AND: [{ id: userId }, { householdId: householdId }] },
  });
  if (!user) throw new NotFoundError();

  const household = await db.household.findFirst({
    where: { id: householdId },
  });
  if (!household) throw new NotFoundError();

  if (household.createdBy === user.id) {
    await deleteHousehold(householdId);
    return;
  } else {
    await updateUser(user.id, {
      householdId: null,
    });
  }
};

export const inviteUserToHousehold = async ({
  userId,
  householdId,
  currentUser,
}: {
  userId: string;
  householdId: string;
  currentUser: string;
}) => {
  const user = await getUser(userId);
  const household = await getHousehold(householdId);

  if (user && household) {
    const newInvite = await db.householdInvite.create({
      data: {
        id: getUuid(),
        householdId: householdId,
        userId: userId,
        createdBy: currentUser,
      },
    });
    return newInvite;
  }
};

export const acceptHouseholdInvite = async (id: string) => {
  const invite = await db.householdInvite.findUnique({
    where: { id },
  });
  if (invite) {
    const updatedUser = await updateUser(invite?.userId, {
      householdId: invite?.householdId,
    });
    const deletedInvite = await db.householdInvite.delete({ where: { id } });
    return deletedInvite;
  }
  throw new NotFoundError();
};

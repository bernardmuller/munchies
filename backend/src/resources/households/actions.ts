import { db } from '../../db/db';
import { getUuid } from '../../shared/utils';
import { householdsModel } from '../../../prisma/zod';
import { getUser, updateUser } from '../users/actions';
import { NotFoundError } from '../../shared/errors';
import { items } from '@prisma/client';

export const createHousehold = async ({ userId }: { userId: string }) => {
  const householdData = { createdBy: userId, id: getUuid() };

  const user = await getUser(userId);
  if (user?.householdid) {
    throw new Error('You are already part of a household');
  }

  const res = await db.households.create({ data: householdData });

  await updateUser(res.createdBy, {
    householdid: res.id,
  });

  const newHousehold = householdsModel.parse(res);
  return newHousehold;
};

export const getHouseholds = async (params?: { filters?: { id?: string } }) => {
  if (params?.filters?.id) {
    const row = await db.households.findUnique({
      where: { id: params.filters.id },
    });

    const users = await db.users.findMany({
      where: { householdid: row?.id },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        householdid: true,
      },
    });

    const latestGrocerylist = await db.grocerylists.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      where: { householdId: row?.id },
    });

    const items = await db.items
      .findMany({
        where: { groceryListId: latestGrocerylist?.id },
        include: { ingredient: true },
      })
      .then((items) =>
        items.map((item: items) => {
          return {
            ...item,
            createdBy: users.find((user) => user.id === item.createdBy)
              ?.firstname,
          };
        }),
      );

    return {
      ...row,
      members: users,
      grocerylist: {
        ...latestGrocerylist,
        items,
      },
    };
  }
  const rows = await db.households.findMany();
  const households = rows.map((row) => householdsModel.parse(row));
  return households;
};

export const getHousehold = async (id: string) => {
  const household = await db.households.findUnique({ where: { id } });
  if (household) throw new Error(`Household with id: ${id} not found`);
  return household;
};

export const deleteHousehold = async (id: string) => {
  const household = await getHouseholds({ filters: { id } });
  if (!household) throw new Error('Household not found');

  await db.households.delete({
    where: {
      id,
    },
  });
  return { message: 'Household deleted successfully' };
};

export const deleteAllHouseholds = async () => {
  await db.households.deleteMany();
};

export const removeUserFromHousehold = async (
  userId: string,
  householdId: string,
) => {
  const user = await db.users.findFirst({
    where: { AND: [{ id: userId }, { householdid: householdId }] },
  });
  if (!user) throw new NotFoundError();

  const household = await db.households.findFirst({
    where: { id: householdId },
  });
  if (!household) throw new NotFoundError();

  // if (household.createdBy === user.id) {
  //   await deleteHousehold(householdId);
  //   return;
  // } else {
  await updateUser(user.id, {
    householdid: null,
  });
  // }
};

export const addUserToHousehold = async (
  userId: string,
  householdId: string,
) => {
  const user = await db.users.findFirst({
    where: { id: userId },
  });
  if (!user) throw new NotFoundError('user not found');

  const household = await db.households.findFirst({
    where: { id: householdId },
  });
  if (!household) throw new NotFoundError();

  // if (household.createdBy === user.id) {
  //   await deleteHousehold(householdId);
  //   return;
  // } else {
  await updateUser(user.id, {
    householdid: householdId,
  });
  // }
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

  if (!household) throw new NotFoundError();

  if (user && household) {
    const newInvite = await db.household_invites.create({
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
  const invite = await db.household_invites.findUnique({
    where: { id },
  });
  if (invite) {
    const updatedUser = await updateUser(invite?.userId, {
      householdid: invite?.householdId,
    });
    const deletedInvite = await db.household_invites.delete({ where: { id } });
    return deletedInvite;
  }
  throw new NotFoundError();
};

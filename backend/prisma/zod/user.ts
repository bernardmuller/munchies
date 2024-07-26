import * as z from 'zod';
import {
  CompleteSession,
  RelatedSessionModel,
  CompleteHousehold,
  RelatedHouseholdModel,
  CompleteHouseholdInvite,
  RelatedHouseholdInviteModel,
} from './index';

export const usersModel = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  dateOfBirth: z.date().nullish(),
  role: z.string().nullish(),
  bio: z.string().nullish(),
  image: z.string().nullish(),
  status: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  householdId: z.string().nullish(),
});

export interface CompleteUser extends z.infer<typeof usersModel> {
  session: CompleteSession[];
  household?: CompleteHousehold | null;
  HouseholdInvite: CompleteHouseholdInvite[];
}

/**
 * RelatedusersModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedusersModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
  usersModel.extend({
    session: RelatedSessionModel.array(),
    household: RelatedHouseholdModel.nullish(),
    HouseholdInvite: RelatedHouseholdInviteModel.array(),
  }),
);

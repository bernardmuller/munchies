import * as z from 'zod';
import {
  CompleteHousehold,
  RelatedHouseholdModel,
  CompleteUser,
  RelatedusersModel,
} from './index';

export const HouseholdInviteModel = z.object({
  id: z.string(),
  createdBy: z.string(),
  createdAt: z.date(),
  householdId: z.string(),
  userId: z.string(),
});

export interface CompleteHouseholdInvite
  extends z.infer<typeof HouseholdInviteModel> {
  household: CompleteHousehold;
  user: CompleteUser;
}

/**
 * RelatedHouseholdInviteModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHouseholdInviteModel: z.ZodSchema<CompleteHouseholdInvite> =
  z.lazy(() =>
    HouseholdInviteModel.extend({
      household: RelatedHouseholdModel,
      user: RelatedusersModel,
    }),
  );

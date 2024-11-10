import { u, i } from './getAllCategories-f73zdoR0.mjs';
import { z } from 'zod';

z.object({ id: z.string(), name: z.string(), categoryId: z.string() });
async function a(e) {
  return await u(i.ingredients(), "GET", void 0, { accessToken: e });
}

export { a };
//# sourceMappingURL=getAllIngredients-6sXcg4a7.mjs.map

import * as z from "zod";

export const LoginDTOSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(100),
});

export const SignupDTOSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(100),
	lastName: z.string().min(1).max(100),
	firstName: z.string().min(1).max(100),
});

export type LoginDTO = z.infer<typeof LoginDTOSchema>;
export type SignupDTO = z.infer<typeof SignupDTOSchema>;

const IngredientSchema = z.object({
	id: z.string(),
	name: z.string(),
	categoryId: z.number(),
	createdAt: z.string(),
	createdBy: z.string().nullable(),
	mealId: z.string(),
});

export type Ingredient = z.infer<typeof IngredientSchema>;

const MealSchema = z.object({
	id: z.string(),
	name: z.string(),
	seasons: z.string().nullable(),
	directions: z.array(z.string()),
	cuisine: z.string().nullable(),
	image: z.string().nullable(),
	URL: z.string().nullable(),
	prepTime: z.string().nullable(),
	cookTime: z.string().nullable(),
	readyIn: z.string().nullable(),
	rating: z.number().nullable(),
	notes: z.string().nullable(),
	createdAt: z.string(),
	createdBy: z.string(),
	ingredients: z.array(IngredientSchema),
});

export type Meal = z.infer<typeof MealSchema>;

const GroceryListItemSchema = z.object({
	id: z.string(),
	check: z.boolean(),
	typeId: z.number(),
	description: z.string().nullable(),
	groceryListId: z.string(),
	ingredientId: z.string(),
	ingredient: IngredientSchema,
});

export type GroceryListItem = z.infer<typeof GroceryListItemSchema>;

const MenuSchema = z.object({
	id: z.string(),
	name: z.string(),
	startDate: z.string().nullable(),
	endDate: z.string().nullable(),
	createdAt: z.string(),
	householdId: z.string().nullable(),
	createdBy: z.string(),
	archived: z.boolean(),
	grocerylistId: z.string(),
});

export type Menu = z.infer<typeof MenuSchema>;

const GroceryListSchema = z.object({
	id: z.string(),
	createdAt: z.string(),
	createdBy: z.string(),
	menuId: z.string(),
	menu: MenuSchema,
	items: z.array(GroceryListItemSchema),
});

export type GroceryList = z.infer<typeof GroceryListSchema>;

const MealPlanSchema = z.object({
	id: z.string(),
	name: z.string(),
	startDate: z.string().nullable(),
	endDate: z.string().nullable(),
	createdAt: z.string(),
	householdId: z.string().nullable(),
	createdBy: z.string(),
	archived: z.boolean(),
	grocerylistId: z.string(),
	meals: z.array(MealSchema),
	grocerylist: GroceryListSchema,
});

export type MealPlan = z.infer<typeof MealPlanSchema>;

const SessionSchema = z.object({
	userId: z.string(),
	token: z.string(),
	expiresAt: z.string(),
	username: z.string(),
});

export type Session = z.infer<typeof SessionSchema>;

-- +goose Up
ALTER TABLE "menu_meals"
ADD CONSTRAINT "menu_meals_menu_id_fkey"
FOREIGN KEY ("menu_id")
REFERENCES "menus" ("id")
ON DELETE CASCADE;

ALTER TABLE "menu_meals"
ADD CONSTRAINT "menu_meals_meal_id_fkey"
FOREIGN KEY ("meal_id")
REFERENCES "meals" ("id")
ON DELETE CASCADE;

-- +goose Down
ALTER TABLE "menu_meals" 
DROP CONSTRAINT "menu_meals_menu_id_fkey";

ALTER TABLE "menu_meals" 
DROP CONSTRAINT "menu_meals_meal_id_fkey";


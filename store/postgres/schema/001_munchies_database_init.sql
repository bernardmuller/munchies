-- +goose Up
CREATE TABLE "roles" (
    "id" UUID NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "households" (
    "id" UUID NOT NULL PRIMARY KEY,
    "createdby" UUID NOT NULL,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "menus" (
    "id" UUID NOT NULL PRIMARY KEY,
    "name" TEXT DEFAULT 'New Menu',
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "household_id" UUID,
    "createdby" UUID,
    "archived" BOOLEAN DEFAULT false,
    "grocerylist_id" UUID
);

CREATE TABLE "meals" (
    "id" UUID NOT NULL PRIMARY KEY,
    "name" TEXT DEFAULT 'New Meal',
    "deleted" BOOLEAN DEFAULT false,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" UUID
);

CREATE TABLE "menu_meals" (
    "id" UUID NOT NULL PRIMARY KEY,
    "menu_id" UUID NOT NULL,
    "meal_id" UUID NOT NULL
);

CREATE TABLE "ingredients" (
    "id" UUID NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category_id" UUID NOT NULL,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" UUID
);

CREATE TABLE "meal_ingredients" (
    "id" UUID NOT NULL PRIMARY KEY,
    "meal_id" UUID NOT NULL,
    "ingredient_id" UUID NOT NULL,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" UUID
);

CREATE TABLE "grocerylists" (
    "id" UUID NOT NULL PRIMARY KEY,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" UUID,
    "menu_id" UUID,
    "household_id" UUID
);

CREATE TABLE "items" (
    "id" UUID NOT NULL PRIMARY KEY,
    "check" BOOLEAN NOT NULL DEFAULT false,
    "typeid" INTEGER NOT NULL,
    "description" TEXT,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" UUID,
    "grocerylist_id" UUID NOT NULL,
    "ingredient_id" UUID
);

CREATE TABLE "categories" (
    "id" UUID NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "permissions" (
    "id" UUID NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "role_permissions" (
    "role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "users" (
    "id" UUID NOT NULL PRIMARY KEY,
    "clerk_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "role_id" UUID NOT NULL,
    "image" TEXT,
    "status" TEXT,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ NOT NULL,
    "household_id" UUID
);

CREATE TABLE "grocerylist_items" (
    "id" UUID NOT NULL PRIMARY KEY,
    "grocerylist_id" UUID NOT NULL,
    "item_id" UUID NOT NULL,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" UUID
);

-- Constraints
ALTER TABLE "users"
    ADD CONSTRAINT "users_role_fkey" 
    FOREIGN KEY ("role_id") 
    REFERENCES "roles" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,

    ADD CONSTRAINT "users_household_id_fkey" 
    FOREIGN KEY ("household_id") 
    REFERENCES "households" ("id") 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;

ALTER TABLE "households"
    ADD CONSTRAINT "households_createdby_fkey" 
    FOREIGN KEY ("createdby") 
    REFERENCES "users" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

ALTER TABLE "menus"
    ADD CONSTRAINT "menus_household_id_fkey" 
    FOREIGN KEY ("household_id") 
    REFERENCES "households" ("id") 
    ON DELETE SET NULL 
    ON UPDATE CASCADE,
    
    ADD CONSTRAINT "menus_grocerylist_id_fkey" 
    FOREIGN KEY ("grocerylist_id") 
    REFERENCES "grocerylists" ("id") 
    ON DELETE SET NULL 
    ON UPDATE CASCADE,

    ADD CONSTRAINT "menus_createdby_fkey" 
    FOREIGN KEY ("createdby") 
    REFERENCES "users" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

ALTER TABLE "meals"
    ADD CONSTRAINT "meals_createdby_fkey" 
    FOREIGN KEY ("createdby") 
    REFERENCES "users" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

ALTER TABLE "menu_meals"
    ADD CONSTRAINT "menu_meals_menu_id_fkey" 
    FOREIGN KEY ("menu_id") 
    REFERENCES "menus" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,

    ADD CONSTRAINT "menu_meals_meal_id_fkey" 
    FOREIGN KEY ("meal_id") 
    REFERENCES "meals" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

ALTER TABLE "ingredients"
    ADD CONSTRAINT "ingredients_category_id_fkey" 
    FOREIGN KEY ("category_id") 
    REFERENCES "categories" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,

    ADD CONSTRAINT "ingredients_createdby_fkey" 
    FOREIGN KEY ("createdby") 
    REFERENCES "users" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

ALTER TABLE "meal_ingredients"
    ADD CONSTRAINT "meal_ingredients_meal_id_fkey" 
    FOREIGN KEY ("meal_id") 
    REFERENCES "meals" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,

    ADD CONSTRAINT "meal_ingredients_ingredient_id_fkey" 
    FOREIGN KEY ("ingredient_id") 
    REFERENCES "ingredients" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,

    ADD CONSTRAINT "meal_ingredients_createdby_fkey" 
    FOREIGN KEY ("createdby") 
    REFERENCES "users" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

ALTER TABLE "grocerylists"
    ADD CONSTRAINT "grocerylists_menu_id_fkey" 
    FOREIGN KEY ("menu_id") 
    REFERENCES "menus" ("id") 
    ON DELETE SET NULL 
    ON UPDATE CASCADE,

    ADD CONSTRAINT "grocerylists_household_id_fkey" 
    FOREIGN KEY ("household_id") 
    REFERENCES "households" ("id") 
    ON DELETE SET NULL 
    ON UPDATE CASCADE,

    ADD CONSTRAINT "grocerylists_createdby_fkey" 
    FOREIGN KEY ("createdby") 
    REFERENCES "users" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

ALTER TABLE "items"
    ADD CONSTRAINT "items_grocerylist_id_fkey" 
    FOREIGN KEY ("grocerylist_id") 
    REFERENCES "grocerylists" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,

    ADD CONSTRAINT "items_ingredient_id_fkey" 
    FOREIGN KEY ("ingredient_id") 
    REFERENCES "ingredients" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,

    ADD CONSTRAINT "items_createdby_fkey" 
    FOREIGN KEY ("createdby") 
    REFERENCES "users" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

ALTER TABLE "role_permissions"
    ADD CONSTRAINT "role_permissions_role_id_fkey" 
    FOREIGN KEY ("role_id") 
    REFERENCES "roles" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,

    ADD CONSTRAINT "role_permissions_permission_id_fkey" 
    FOREIGN KEY ("permission_id") 
    REFERENCES "permissions" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

ALTER TABLE "grocerylist_items"
    ADD CONSTRAINT "grocerylist_items_grocerylist_id_fkey" 
    FOREIGN KEY ("grocerylist_id") 
    REFERENCES "grocerylists" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,

    ADD CONSTRAINT "grocerylist_items_item_id_fkey" 
    FOREIGN KEY ("item_id") 
    REFERENCES "items" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,

    ADD CONSTRAINT "grocerylist_items_createdby_fkey" 
    FOREIGN KEY ("createdby") 
    REFERENCES "users" ("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

-- inserts
INSERT INTO "roles" ("id", "name") VALUES 
('22580627-39de-4dc6-8063-a2c095156780', 'user'),
('ddd5f3f2-8877-4fa0-9654-114ec21ef04b', 'admin');

INSERT INTO "categories" ("id", "name") VALUES 
('9d71dee7-9468-4b9d-b7ff-0c94f321cc98', 'Fruits'),
('07f760a5-08f1-44c5-9013-675c271d22d1', 'Vegetables'),
('dc59aba9-02ac-4010-8767-4d2ddb20cba3', 'Dairy'),
('3c34e921-5b71-4e4f-a060-3f6475c2224c', 'Grains'),
('f0b3ac6e-9a5d-48fe-ba09-511b1871605a', 'Nuts & Seeds'),
('5c35c2f5-e44b-4e2d-b789-676d5bb5861d', 'Herbs & Spices'),
('7f5277fb-f6de-4e9a-85be-c6625ac4cae4', 'Meats & Poultry'),
('3687092d-a1d7-435b-a092-318cc3088e8f', 'Fish & Seafood'),
('e9d474bf-ef6c-436b-89c1-5438aa66444d', 'Fats & Oils'),
('11eab64e-d05e-4284-93b0-b4dcded06fba', 'Legumes & Beans');

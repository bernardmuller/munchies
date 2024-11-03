-- +goose Up
INSERT INTO "categories" ("id", "name") VALUES
( 'c18e20bb-57a9-4034-bc94-2424579bf531', 'Condiments' ),
( '345d888d-cb6a-41d6-8eff-a2803c785c74', 'Beverages' ),
( '29751a57-9b57-4f5e-97f6-ee6cd4bd4542', 'Packaged Foods' ),
( '3c34e921-5b71-4e4f-a060-3f6475c2224c', 'Grains & Carbs' ),
( '828e026d-8085-4cae-b70c-a657d40514d1', 'Cleaning Products' ),
( 'cca1c111-9f33-41fc-8e24-f29b61529d26', 'Other' );



-- +goose Down
DELETE FROM "categories" WHERE "id" IN (
    'c18e20bb-57a9-4034-bc94-2424579bf531',ß
    '345d888d-cb6a-41d6-8eff-a2803c785c74',
    '29751a57-9b57-4f5e-97f6-ee6cd4bd4542',
    '3c34e921-5b71-4e4f-a060-3f6475c2224c',
    '828e026d-8085-4cae-b70c-a657d40514d1',
    'cca1c111-9f33-41fc-8e24-f29b61529d26'
);
# Munchies

This is the repository for the Munchies app.

Munchies is a grocerylist manager that creates grocerylists based on meals a user adds to a meal plan.

## Getting started

To get started and run the project, please follow the instructions below:

### Prerequisites

1. Install backend dependencies

```sh
    cd backend
    yarn install
```

2. Configure environment variables for backend by creating a new .env file and copy the contents from "example.env" into it.

3. Install frontend dependencies

```sh
    cd frontend
    yarn install
```

4. Install dev dependencies

```sh
    yarn install
```

5. Start the local PostgreSQL server

```sh
    docker-compose up
```

5. Migrate the database

```sh
    cd backend
    npx primsa migrate dev
```

7. Run the project

```sh
    yarn start
```

## Project Background

### Resources

[Munchies Excalidraw](https://excalidraw.com/#json=O0_W6jrmnzy0d9MRg-7Ch,AgK-1deXz_75ka40t5mxQA "Munchies Excalidraw")

[Munchies Designs](https://www.figma.com/file/bVzBBkR9jTt2w1SlU1xf47/Untitled?node-id=0%3A1 "Munchies Designs")

# Codeit API

Codeit is an API inspired by LeetCode, built using Node.js, Express, and PostgreSQL with Prisma ORM. It provides endpoints for user authentication using Express middlewares and JSON Web Tokens (JWT).

## Endpoints

#### 1. POST /signup

Register a new user.

#### 2. POST /login

Login to an existing user. Returns user info and a JWT token.

#### 3. GET /user

User dashboard route.

#### 4. GET /problemset

Returns a list of problems.

#### 5. GET /problemset/:problemid

Returns full information about a problem with the given ID.

#### 6. GET /problemset/:problemid/submission

Gets all user submissions for a particular problem ID.

#### 7. POST /problemset/:problemid/submission

Makes a new submission in the database.

## Technologies Used

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JSON Web Tokens (JWT)

## Local setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your PostgreSQL database and configure the connection in the `.env` file.
4. Run the migrations using Prisma with `npx prisma migrate dev`.
5. Start the server with `npm start`.

## Local setup docker

1. Clone the repository using
   ```sh
    git clone https://github.com/HarshK200/Codeit-API.git

3. Create a file with .env name and paste the following:
   ```.env
   DATABASE_URL="postgresql://postgres:password@postgres:5432/my_db?schema=public"
   SECRET_KEY="THISISASECRET" # just some random string for now but use an good SECRET_KEY on production

5. In the cloned repository folder run
   ```sh
   docker compose up
7. The sever should be running on localhost:3000

## Usage

1. Use POST /signup to register a new user.
2. Use POST /login to login with an existing user and receive a JWT token.
3. Access user dashboard with GET /user.
4. Retrieve problems with GET /problemset.
5. Retrieve information about a specific problem with GET /problemset/:problemid.
6. View user submissions for a problem with GET /problemset/:problemid/submission.
7. Make a new submission for a problem with POST /problemset/:problemid/submission.

## Contributors

- [Harsh Kapadia](https://github.com/Harshk200)

## License

This project is licensed under the [MIT License](LICENSE).

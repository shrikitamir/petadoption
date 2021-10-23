# PetPalace

This project is a Pet Shelter App made by Tamir Shriki.

## Description

- This Project uses React for the Front-End, Node.js For the Back-End and mySql as a database.
- Front-End Deployed on Netlify.
- Back-End Deployed on Heroku.
- (To use the app features clone and follow the instructions because the database is needed to register and login)
- Make yourself an admin in the database to see more features in the app.

## Getting Started

### Dependencies

- axios.
- bootstrap.
- localforage.
- typed.js.
- express.
- nearform/sql.
- ajv, ajv-formats.
- bcrypt.
- cloudiary.
- cors.
- fluent-json-schema.
- JWT.
- multer.
- mysql.
- postgrator.
- winston.
- dotenv.
- morgan.
- nodemon.

- Run in both folders frontend and backend
```
npm install
```

### Installing

- To use the app you'll need first to configure the environment variables:
- Back-End .env expects:

- (Create Cloudinary User)

- CLOUDINARY_NAME = X
- CLOUDINARY_API_KEY = X
- CLOUDINARY_API_SECRET = X

- (Connect Mysql User)

- DB_HOST = X
- DB_USER = X
- DB_PASSWORD = X
- DB_DATABASE = X
- DB_PORT = X

- (Generate JWT Token)

- ACCESS_TOKEN = X

- Front-End .env expects:

- REACT_APP_API_HOSTNAME = http://localhost:5000 (default)

### Executing program

- In the front-end folder run in the CLI

```
npm start
```

- In the back-end folder run in the CLI

```
npm run dev
```

```
npm start
```

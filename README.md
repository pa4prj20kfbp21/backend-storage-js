# p4p-backend-storage-js
Backend service used for managing the data of the plant monitoring project.

## Requirements
* [NodeJS](https://nodejs.org/en/download/) - V12+
* NPM (Comes with NodeJS)
* [MongoDB Server](https://www.mongodb.com/try/download/community) (Locally hosted or Atlas works fine)

## Pre-Installation Steps
Run the command in the working directory.
```bash
npm install
```

Optional: Create a `.env` file to setup environment variables for use when configuring server. See `.env.example` file for a sample setup.

## Populating database (Optional)
Run the following command to populate the database.
```bash
npm run init-db
```
DO NOT run this in production as this clears all the data in the database.

WARNING: Command may not work in Windows since there is unix commands used to initialise dummy data. In this case, go to `./public/api` and copy `examples` folder and rename the copy to `images`.

## Running the server
Run the command in the working directory to start in development mode.
```bash
npm start
```

Or run this code if in production mode:
```bash
npm run production
```
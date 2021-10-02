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

## Supported URLS
GET:

Dates: 
* `http://localhost:3001/api/dates` - Gets all available dates.
* `http://localhost:3001/api/dates/id/ID` - Get a date with supplied Object ID.
* `http://localhost:3001/api/dates/envRef/ID` - Get a date with supplied Environment Reference Object ID.

Images: 
* `http://localhost:3001/api/images/URL` - Get locally stored image with shortened URL.

Image Info:
* `http://localhost:3001/api/imageinfo/allinfo/ID` - Fetch information about an image given its ID.

Plant Parts:
* `http://localhost:3001/api/plant-parts/id/ID` - Fetch a plant part based on its ID
* `http://localhost:3001/api/plant-parts/query?itemType=TYPE` - Fetch all plant parts based on its TYPE (only option is `fruits`).

Object Data:
* `http://localhost:3001/api/object-data/info/ID` - Fetch ObjectData based on ints own Object ID.
* `http://localhost:3001/api/object-data/plant-part/ID` - Get ObjectData info based on the associated Plant Part ID.

POST:


* `http://localhost:3001/api/images/image?name=NAME&date=DATE` - Upload image to backend file storage based on its NAME and DATE. DATE is folder name. NAME is filename without extensions.
* `http://localhost:3001/api/plant-parts/create?name=NAME&date=DATE` - Create a new Plant Part. NAME is the name of the plant part. DATE is optional but modifies created date. Can be useful for stating Fruit bearing time.
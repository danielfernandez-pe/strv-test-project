# Test Project

## Introduction

This is a demo project

## Description

As requested, this application allows users to authenticate and add contacts to their contact list.

## Table of Contents

1. [Introduction](#introduction)
2. [Description](#description)
3. [Running Locally](#running-locally)
4. [Testing](#testing)
5. [Next steps](#next-steps)
6. [License](#license)
7. [Authors](#authors)

## Running Locally

**Prerequisites**

- Node.js (version 23.2.0 or higher)
- npm (version 10.9.0 or higher)
- Nodemon installed globally `npm install -g nodemon`

### Steps to run locally:

1. Clone the repository:
    ```bash
    git clone git@github.com:danielfcodes/node-test-project.git
    cd node-test-project
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project with the following structure. (You can ask me later for the values of these properties):
    ```bash
    PORT=

    DATABASE_USER=
    DATABASE_PASSWORD=
    DATABASE_HOST=
    DATABASE_NAME=
    DATABASE_OPTIONS=

    DATABASE_DEV_URI=

    JWT_KEY=
    GOOGLE_SERVICE_ACCOUNT_BASE64=
    ```

4. To run the application in development mode:
    ```bash
    npm run dev
    ```

5. Open Postman or your preferred tool to interact with the API.

## Testing

To test manually the app you could use the collections inside `postman-collections` to import into Postman and start testing the functionality of the app manually.

1. Click on File in the menu
2. Import
3. Drag the .json files
4. Select the `prod` environment
5. Have fun!

To run the unit tests, execute the following command:
```bash
npm test
```

## Next steps

Some of the things I'd like to improve are the following:

- Add Swagger docs. I added a postman collection so it's easy to understand how to interact with the API but Swagger is a standard and would be easier for most users.
- Improve the CI to run tests before deploying the prod. Use Github Actions for this and not rely entirely on Railway

## License

This project is licensed under the MIT License.

## Authors

Daniel Fernandez

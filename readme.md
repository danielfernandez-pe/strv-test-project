# STRV Test Project

## Introduction

This is a demo project created for the STRV interview process.

## Description

As requested, this application allows users to authenticate and add contacts to their contact list.

## Table of Contents

1. [Introduction](#introduction)
2. [Description](#description)
3. [Running Locally](#running-locally)
4. [Testing](#testing)
5. [License](#license)
6. [Authors](#authors)

## Running Locally

**Prerequisites**

- Node.js (version 23.2.0 or higher)
- npm (version 10.9.0 or higher)

### Steps to run locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo-name.git
    cd your-repo-name
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

To run the unit tests, execute the following command:
```bash
npm test
```

## License

This project is licensed under the MIT License.

## Authors

Daniel Fernandez
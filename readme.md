# STRV test project

## Introduction

This is my demo project for STRV interview process.

## Description

As requested, this app allow users to authenticate and add users to their contact list.

## Table of Contents

1. [Introduction](#introduction)
2. [Description](#description)
4. [Running Locally](#running-locally)
5. [Testing](#testing)
6. [License](#license)
7. [Authors](#authors)

## Running Locally

**Prerequisites**

- Node.js (version 23.2.0 or higher)
- npm (version 10.9.0 or higher)

1. Clone the repository
```bash
git clone https://github.com/your-repo-name.git
cd your-repo-name
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root of the project with the following structure (Ask me later for the values of these properties)

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

5. Open Postman and enjoy

## Testing

Run the unit tests by running: `npm test`

## License

This project is licensed under the MIT License. You can include any other license your project uses.

## Authors

- Daniel Fernandez
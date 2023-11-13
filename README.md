<div align="center" id="readme-header">

  ![miniurl-logo]()

  [![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
</div>


<div align="center">

Shorten URLs and track their performance with built-in analytic tools.

[Github](https://github.com/michaelhjung/miniurl) &nbsp;•&nbsp;
[Documentation](https://github.com/michaelhjung/miniurl/wiki) &nbsp;•&nbsp;
**[Live Site](https://miniurl.page)**

</div>


<details>
  <summary>📖 Table of Contents</summary>

- [💻 Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [💬 Contact](#-contact)
- [🗂️ Project Folder Structure](#️-project-folder-structure)
</details>


## 💻 Tech Stack

<div align="center"> <!-- TECH STACK -->

  [![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)](https://go.dev/)
  [![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
  [![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)

</div>

Miniurl is a full stack web application designed using [Go](https://go.dev/) in the backend utilizing the [Fiber](https://docs.gofiber.io/) web framework, [GORM](https://gorm.io/index.html), [golang-migrate](https://github.com/golang-migrate/migrate), and a [PostgreSQL](https://www.postgresql.org/) database. On the frontend, it uses [React](https://react.dev/) with [Redux](https://redux.js.org/) for state management.


## 🚀 Getting Started

Details on how to set up Miniurl locally for development purposes:

<div style="margin-left: 20px;">
<details>
<summary>⚙️ Backend Setup</summary>

  1. **Clone the Repository**:
      ```sh
      git clone git@github.com:michaelhjung/miniurl.git
      ```

  2. **Database Setup**: Make sure you have the necessary tools installed on your machine, and set up your postgres database:
     * [Go](https://go.dev/doc/install)
     * [PostgreSQL](https://www.postgresql.org/download/) (Click [here](#db-setup-help) for DB setup help)
     * [Golang-migrate](https://github.com/golang-migrate/migrate)

  3. **Install Dependencies**: cd into the go directory and download dependencies by running:
      ```sh
      cd go/
      go mod download
      ```

  4. **Environment Variables**: Use the .env.example to create a .env file and fill out the necessary .env variables

  5. **Start the Go Server**: you can utilize the script below
      ```sh
      sh scripts/run-server.sh
      ```

  6. **Create Migrations (Optional)**: If you need to create more migrations, you can run the script:
      ```sh
      sh scripts/migrate.sh create <name_of_migration>
      ```
  7. **Other Migration Scripts**:
      ```sh
      sh scripts/migrate.sh up
      ```

      ```sh
      sh scripts/migrate.sh down
      ```

      ```sh
      sh scripts/migrate.sh drop
      ```

      ```sh
      sh scripts/migrate.sh force <version>
      ```
</details>

<details id="db-setup-help"> <!-- POSTGRES SETUP HELP FOR MAC USERS -->
<summary>🐘 PostgreSQL DB Setup (for mac users)</summary>

If you are new to using postgreSQL and are a mac user, here's how you can set up a database and user:

  1. **Access postgreSQL**:
      ```sh
      psql -U postgres
      ```

  2. **Create a new database**:
      ```sh
      CREATE DATABASE <DB_NAME>;
      ```

  3. **Create a new user and set a password**:
      ```sh
      CREATE USER <DB_USER> WITH PASSWORD '<DB_PASSWORD>';
      ```

      You can create a random password with the following command:
      ```sh
      openssl rand -base64 16
      ```

  4. **Grant permissions to the newly created user for the database**:
      ```sh
      GRANT ALL PRIVILEGES ON DATABASE <DB_NAME> TO <DB_USER>;
      ```

  5. **Exit psql**:
      ```sh
      \q
      ```
</details>
</div>

## 💬 Contact

<div align="center">

  [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/michael-h-jung/)
  [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/michaelhjung)
  [![Portfolio](https://img.shields.io/badge/Portfolio-255E63?style=for-the-badge&logo=About.me&logoColor=white)](https://michaelhjung.com)

</div>


## 🗂️ Project Folder Structure

```plaintext
/miniurl
|
|-- /go                       # Backend Go application
|   |-- /api
|   |
|   |-- /cmd
|   |   |-- /server
|   |   |   |-- main.go
|   |
|   |-- /internal
|   |   |-- /config
|   |   |-- /database
|   |   |   |-- /migrations
|   |   |   |-- /models
|   |   |   |-- /seeds
|   |   |   |
|   |   |   |-- init.go
|   |   |   |-- migrate.go
|   |   |   |-- seed.go
|   |   |
|   |   |-- /global           # Global variables and functions
|   |   |-- /middleware
|   |   |-- /repository       # Logic for direct interactions with db (CRUD)
|   |   |-- /service          # Business logic, Validation, Data Aggregation, etc.
|   |   |-- /util
|   |
|   |-- /scripts
|   |   |-- migrate.sh
|   |   |-- run-server.sh
|   |   |-- start-postgres.sh
|   |   |-- stop-postgres.sh
|   |
|   |-- .env
|   |-- .env.example
|   |-- go.mod
|   |-- go.sum
|
|
|-- /react                    # Frontend React application
|   |-- /public
|   |   |-- favicon.ico
|   |   |-- index.html
|   |
|   |-- /src
|   |   |-- /api
|   |   |-- /assets
|   |   |-- /components
|   |   |-- /context
|   |   |-- /pages
|   |   |-- /store
|   |   |-- /styles
|   |   |-- /utils
|   |   |
|   |   |-- App.js
|   |   |-- index.js
|   |   |-- index.scss
|   |
|   |-- .env
|   |-- .env.example
|   |-- .prettierrc
|   |-- package-lock.json
|   |-- package.json
|
|-- .gitignore
|-- LICENSE
|-- README.md
```

Copyright © 2023 Michael Jung
<p align="right"><a href="#readme-header">⬆ back to top</a></p>

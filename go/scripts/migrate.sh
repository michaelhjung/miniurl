#!/bin/bash

# Get the directory of the current script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BASE_DIR="$DIR/../.."  # Adjust this path to fit your directory structure

# Load environment variables from .env file located in /cmd/server directory
source "$BASE_DIR/go/.env"

# Construct the DATABASE_CONNECTION_STRING using individual components
DATABASE_CONNECTION_STRING="postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=${DB_SSLMODE}"

# Check if DB_TIMEZONE is set and append it to the connection string using '&'
if [ ! -z "$DB_TIMEZONE" ]; then
    DATABASE_CONNECTION_STRING="${DATABASE_CONNECTION_STRING}&timezone=${DB_TIMEZONE}"
fi

# Check for migrate command-line tool
if ! command -v migrate &> /dev/null
then
    echo "Error: migrate command not found."
    echo "Please install it from https://github.com/golang-migrate/migrate/tree/master/cmd/migrate"
    exit 1
fi

# Path to the migrations directory
MIGRATIONS_DIR="$BASE_DIR/go/internal/database/migrations"

case $1 in
    "up")
        migrate -database $DATABASE_CONNECTION_STRING -path=$MIGRATIONS_DIR up
        ;;
    "down")
        migrate -database $DATABASE_CONNECTION_STRING -path=$MIGRATIONS_DIR down
        ;;
    "drop")
        migrate -database $DATABASE_CONNECTION_STRING -path=$MIGRATIONS_DIR drop
        ;;
    "force")
        if [ -z "$2" ]; then
            echo "For 'force' command, version argument is required. Usage: ./db_script.sh force <version>"
            exit 1
        fi
        migrate -database $DATABASE_CONNECTION_STRING -path=$MIGRATIONS_DIR force $2
        ;;
    "create")
        if [ -z "$2" ]; then
            echo "For 'create' command, migration name argument is required. Usage: ./db_script.sh create <migration_name>"
            exit 1
        fi
        MIGRATION_NAME=$2
        migrate create -ext sql -dir $MIGRATIONS_DIR -seq $MIGRATION_NAME
        echo "Migration files for $MIGRATION_NAME created successfully!"
        ;;
    *)
        echo "Invalid command. Available commands: up, down, drop, force, create"
        ;;
esac

#!/bin/bash

# Get the directory of the currently executing script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if PostgreSQL is running
if ! pg_isready; then
    echo "PostgreSQL is not running. Starting it now..."
    brew services start postgresql
    if [ $? -ne 0 ]; then
        echo "Failed to start PostgreSQL. Exiting."
        exit 1
    fi
    # Give PostgreSQL some time to start up
    sleep 3
fi

# Navigate to the directory where main.go is located
cd "$DIR/../cmd/server"

# Run the Go application
go run main.go

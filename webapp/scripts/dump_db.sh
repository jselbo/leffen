#!/bin/bash

set -e

# Properties
DB_USER=leffen
DB_NAME=leffen
OUT_FILE=database.sql

OUT_DIR="$(dirname $0)/../db"
OUT_PATH="$OUT_DIR/$OUT_FILE"

echo "Enter the password for mysql user '$DB_USER'"
mysqldump -u $DB_USER -h localhost --no-data -p $DB_NAME > $OUT_PATH


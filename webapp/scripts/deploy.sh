#!/bin/bash

set -e

# cd into source dir
PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )
cd "$PARENT_PATH/.."

DEPLOY_DIR=/var/www/leffen/Leffen

sudo cp *.py $DEPLOY_DIR
sudo cp -R templates $DEPLOY_DIR
sudo cp -R static $DEPLOY_DIR

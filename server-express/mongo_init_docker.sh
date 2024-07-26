#!/bin/bash

# Disable authentication temporarily
mongod --setParameter authenticationMechanisms=""

# Wait for the MongoDB service to start
until mongo --eval "print(\"waited for connection\")" &> /dev/null; do
    echo "Waiting for MongoDB to start..."
    sleep 2
done

# Load environment variables from .env file
set -a
[ -f .env ] && . .env
set +a

# MongoDB configuration, create a user only if he does not exist 
cat <<EOF >mongo-setup.js
use admin
if (!db.getUser("$MONGO_INITDB_ROOT_USERNAME")) {
  db.createUser(
    {
      user: "$MONGO_INITDB_ROOT_USERNAME",
      pwd: "$MONGO_INITDB_ROOT_PASSWORD",
      roles: [
        { role: "read", db: "admin" },
        { role: "readWrite", db: "$MONGO_INITDB_DATABASE" }
      ]
    }
  )
}
EOF

# Authenticate and Run MongoDB command with the script
mongo -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase "admin" < mongo-setup.js

# Clean up the script file
rm mongo-setup.js

# Enable authorization in mongod.conf
# Replace '/etc/mongod.conf' with the correct path within the container
sed -i 's/#security:/security:\n  authorization: enabled/' /etc/mongod.conf

# Set authentication mechanisms using ENV variable
sed -i "s/#setParameter\ authenticationMechanisms=.*/setParameter\ authenticationMechanisms=$AUTH_MECHANISM/" /etc/mongod.conf

# Restart MongoDB service
service mongod restart

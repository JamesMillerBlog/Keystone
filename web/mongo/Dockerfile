# Define the mongo image
FROM mongo:latest

# Create mongo directory
RUN mkdir -p /usr/src/mongo
WORKDIR /usr/src/mongo


# Copy mongo dependencies
# COPY . /usr/src/mongo

VOLUME ./data/db

# RUN mongod -f ./usr/src/mongo/config/mongod.conf

# Expose the server on 27017
EXPOSE 27017 27017

##
# NestJS API app base image based on NodeJS.
##

##
# Stage 1.
##

# Define image.
FROM node:14.17.6-slim as builder
# Set environment variables.
ENV DEBIAN_FRONTEND=noninteractive
# Create app directory.
WORKDIR /app
# Copy sources.
COPY /functions/package.json .
COPY /functions/package-lock.json .
COPY /tools/proto ./tools/proto
COPY /dist/apps/api ./dist/apps/api
# Run tasks:
# - install production dependencies required for NestJS server;
RUN npm i ; \
  npm cache clean --force

##
# Stage 2.
##

# Define image.
FROM node:14.17.6-alpine
# Create app directory.
WORKDIR /app
# Copy sources.
COPY --from=builder /app .
# Configure exposed port.
EXPOSE 8080
# Define startup command.
CMD [ "node", "./dist/apps/api/main.js" ]

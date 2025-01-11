# Base NodeJS image for apps.

# Define image.
FROM node:22.12.0-alpine
# Set environment variables.
ENV DEBIAN_FRONTEND=noninteractive
# Create app directory.
WORKDIR /app
# Install dependencies.
RUN apk --update --no-cache add curl ;\
  npm i -g npm ; \
  addgroup -S appgroup && \
  adduser -S appuser -G appgroup

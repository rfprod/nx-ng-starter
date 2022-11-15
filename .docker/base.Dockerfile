# Base NodeJS image for apps.

# Define image.
FROM node:18.12.1-alpine
# Set environment variables.
ENV DEBIAN_FRONTEND=noninteractive
# Create app directory.
WORKDIR /app
# Copy dist.
COPY /package.json .
COPY /yarn.lock .
# Install dependencies.
RUN npm i -g npm ; \
  npm i --production --ignore-scripts --legacy-peer-deps ; \
  npm cache clean --force; \
  addgroup -S appgroup && \
  adduser -S appuser -G appgroup


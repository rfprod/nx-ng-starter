# NestJS API app base image based on NodeJS.

# Define image.
FROM node:16.14.0-alpine
# Set environment variables.
ENV DEBIAN_FRONTEND=noninteractive
# Create app directory.
WORKDIR /app
# Copy sources.
COPY /functions/package.json .
COPY /functions/package-lock.json .
COPY /tools/proto ./tools/proto
COPY /dist/apps/api ./dist
# Install dependencies.
RUN npm i -g npm ; \
  npm i --production --ignore-scripts --legacy-peer-deps ; \
  npm cache clean --force; \
  addgroup -S appgroup && \
  adduser -S appuser -G appgroup
# Set user.
USER appuser
# Configure exposed port.
EXPOSE 8080 8082
# Define startup command.
CMD [ "node", "./dist/main.js" ]

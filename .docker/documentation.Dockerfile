# Monorepo documentation app image based on NodeJS.

# Define image.
FROM node:16.14.0-alpine
# Set environment variables.
ENV DEBIAN_FRONTEND=noninteractive
# Create app directory.
WORKDIR /app
# Copy dist.
COPY /package.json .
COPY /yarn.lock .
COPY /dist/apps/server-prod ./dist
COPY /dist/apps/documentation ./dist/assets
# Install dependencies.
RUN npm i -g npm ; \
  npm i --production --ignore-scripts --legacy-peer-deps ; \
  npm cache clean --force; \
  addgroup -S appgroup && \
  adduser -S appuser -G appgroup
# Set user.
USER appuser
# Configure exposed port.
EXPOSE 8080
# Define startup command.
CMD [ "node", "./dist/main.js" ]

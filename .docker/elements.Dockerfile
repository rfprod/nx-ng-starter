# Elements app image.

# Define image.
FROM rfprod/nx-ng-starter:base-latest
# Set environment variables.
ENV DEBIAN_FRONTEND=noninteractive
# Create app directory.
WORKDIR /app
# Copy dist.
COPY /dist/apps/server-prod ./dist
COPY /dist/apps/elements ./dist/assets
COPY /apps/server-prod/package.json .
# Install dependencies.
RUN npm i --production --legacy-peer-deps ; \
  npm cache clean --force
# Set user.
USER appuser
# Configure exposed port.
EXPOSE 8080
# Set up a health check.
HEALTHCHECK --interval=5m --timeout=3s CMD curl --fail http://localhost:8080 || exit 1
# Define startup command.
CMD [ "node", "./dist/main.js" ]

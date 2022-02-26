# Client app image.

# Define image.
FROM rfprod/nx-ng-starter:base-latest
# Set environment variables.
ENV DEBIAN_FRONTEND=noninteractive
# Create app directory.
WORKDIR /app
# Copy dist.
COPY /dist/apps/server-prod ./dist
COPY /dist/apps/client ./dist/assets
# Set user.
USER appuser
# Configure exposed port.
EXPOSE 8080
# Define startup command.
CMD [ "node", "./dist/main.js" ]

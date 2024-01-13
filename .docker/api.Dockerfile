# API app image.

# Define image.
FROM rfprod/nx-ng-starter:base-latest
# Set environment variables.
ENV DEBIAN_FRONTEND=noninteractive
# Create app directory.
WORKDIR /app
# Copy sources.
COPY /tools/proto ./tools/proto
COPY /dist/apps/api ./dist
# Set user.
USER appuser
# Configure exposed port.
EXPOSE 8080 8082
# Set up health check.
HEALTHCHECK --interval=10s --timeout=3s CMD curl --fail http://localhost:8080 || exit 1
# Define startup command.
CMD [ "node", "./dist/main.js" ]

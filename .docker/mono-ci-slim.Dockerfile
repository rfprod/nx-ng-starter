##
# Summary:
# - uses specific node version image;
# - installs system dependencies required for client application testing in a docker container;
##

# Define image.
FROM node:14.17.0-slim
# Set environment variables.
ENV DEBIAN_FRONTEND=noninteractive
# Create app directory.
WORKDIR /app
# Set user
USER root
# Copy sources.
COPY . .
##
# Run tasks.
RUN echo "Mono CI: slim"; \
  echo "Installing system packages..."; \
  apt-get update; \
  apt-get -y upgrade --fix-missing; \
  apt-get -y install --fix-missing --allow-unauthenticated apt-utils build-essential software-properties-common; \
  apt-get -y install --fix-missing --allow-unauthenticated apt-transport-https ca-certificates curl gnupg2; \
  apt-get -y install --fix-missing xvfb; \
  apt-get -y install --fix-missing --allow-unauthenticated libnss3-tools libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth; \
  apt-get -y install --fix-missing wget nano locales; \
  sleep 1; \
  apt-get -y autoremove; \
  apt-get -y autoclean; \
  sleep 1; \
  echo "Installing global dependencies..."; \
  bash ./tools/shell/docker-task.sh install-docker-ci; \
  sleep 1; \
  echo "Setting /tmp directory permissions..."; \
  find /tmp -type f -exec chmod 644 {} \; && find /tmp -type d -exec chmod 755 {} \; && chmod -R o+rw /tmp

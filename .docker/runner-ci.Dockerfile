# CI/CD runner image with docker.

# Define image.
FROM node:18.14.0
# Set environment variables.
ENV DEBIAN_FRONTEND=noninteractive
# Create app directory.
WORKDIR /app
# Set user
USER root
# Copy sources.
COPY . .
# Run tasks.
RUN echo "Runner CI: default"; \
  echo "Installing system packages..."; \
  apt-get update; \
  apt-get -y upgrade --fix-missing; \
  apt-get -y install --fix-missing --allow-unauthenticated apt-utils build-essential software-properties-common; \
  apt-get -y install --fix-missing --allow-unauthenticated apt-transport-https ca-certificates curl gnupg2; \
  apt-get -y install --fix-missing xvfb; \
  apt-get -y install --fix-missing --allow-unauthenticated libnss3-tools libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth; \
  apt-get -y install --fix-missing wget nano locales; \
  sleep 1; \
  echo "Installing Docker..."; \
  apt-get -y install --fix-missing ca-certificates curl gnupg2 software-properties-common; \
  curl -fsSL http://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; \
  apt-key add /tmp/dkey && \
  add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable"; \
  apt-get update; \
  apt-get -y upgrade --fix-missing; \
  apt-get -y install --fix-missing docker-ce; \
  sleep 1; \
  apt-get -y autoremove; \
  apt-get -y autoclean; \
  sleep 1; \
  echo "Installing global dependencies..."; \
  bash ./tools/shell/docker-task.sh install-docker-ci; \
  sleep 1; \
  echo "Setting /tmp directory permissions..."; \
  find /tmp -type f -exec chmod 644 {} \; && find /tmp -type d -exec chmod 755 {} \; && chmod -R o+rw /tmp; \
  useradd -d /home/user -m -s /bin/bash user
# Set user
USER user

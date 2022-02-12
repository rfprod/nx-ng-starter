#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")/../.." || exit

source tools/shell/build-utils.sh

if [[ -f ./tools/shell/vars.sh ]]; then
  cmd source tools/shell/vars.sh
else
  warn './tools/shell/vars.sh does not exist'
fi

if [[ -z ${JAVA_HOME:-} ]]; then
  dir="${HOME}/java/"
  if [[ -d $dir ]]; then
    export JAVA_HOME="$dir"
  else
    error "JAVA_HOME is not set and ${dir} does not exist"
  fi
fi

if [[ -z ${ANDROID_HOME:-} ]]; then
  dir="${HOME}/Android/Sdk"
  if [[ -d $dir ]]; then
    export ANDROID_HOME="$dir"
  else
    error "ANDROID_HOME is not set and ${dir} does not exist"
  fi
fi

if [[ -z ${ANDROID_BUILD_TOOLS:-} ]]; then
  dir="$(find "${ANDROID_HOME}/build-tools" -maxdepth 1 -name "*.*.*" | head -n 1)"
  if [[ -n $dir ]]; then
    ANDROID_BUILD_TOOLS="${dir}"
  else
    error "ANDROID_BUILD_TOOLS is not set and ${ANDROID_HOME}/build-tools/<version> does not exist"
  fi
fi

if [[ -z ${ANDROID_KEYSTORE:-} ]]; then
  ANDROID_KEYSTORE='release-key.keystore'
  ANDROID_KEYSTORE_ALIAS='key-alias'
  ANDROID_KEYSTORE_PASSWORD='release'
fi

BUILD_APK='app/build/outputs/apk/release/app-release-unsigned.apk'
UNSIGNED_APK='build/release-unsigned.apk'
SIGNED_APK='build/release-signed.apk'

log 'building web code...'
cmd npx nx affected:build --prod

log 'copying web code...'
cmd npx cap copy android

log 'building android project...'
cmd cd android
rm -fv "$BUILD_APK" "$UNSIGNED_APK" "$SIGNED_APK"
cmd ./gradlew assemble

if [[ ! -e $ANDROID_KEYSTORE ]]; then
  log 'generating key...' >&2
  cmd keytool -genkey -v -keystore "$ANDROID_KEYSTORE" -alias "$ANDROID_KEYSTORE_ALIAS" -storepass "$ANDROID_KEYSTORE_PASSWORD" -keyalg RSA -keysize 2048 -validity 1000000
fi

log 'signing apk...'
cmd cp "$BUILD_APK" "$UNSIGNED_APK"
cmd jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore "$ANDROID_KEYSTORE" "$UNSIGNED_APK" "$ANDROID_KEYSTORE_ALIAS" -storepass "$ANDROID_KEYSTORE_PASSWORD"
cmd "${ANDROID_BUILD_TOOLS}/zipalign" -v 4 "$UNSIGNED_APK" "$SIGNED_APK"
cmd "${ANDROID_BUILD_TOOLS}/apksigner" verify "$SIGNED_APK"

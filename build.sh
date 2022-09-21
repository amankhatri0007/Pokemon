#! /bin/sh

npm install
ionic build
ionic capacitor add android
ionic capacitor sync android
cp google-services.json android/app
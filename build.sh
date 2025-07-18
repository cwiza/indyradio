#!/bin/bash

# Build the application
npm run build

# Copy build files to docs directory
cp -R build/* docs/

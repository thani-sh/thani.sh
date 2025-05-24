#!/bin/bash

rm -rf static/blog
mkdir -p static/blog
yarn workspaces foreach -R --from 'src/routes/blog/*/embed-*' run build

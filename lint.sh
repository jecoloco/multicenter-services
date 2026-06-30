#!/bin/bash

cd node/
[ -d node_modules ] && rm -rf node_modules
/usr/local/bin/yarn cache clean
/usr/local/bin/yarn --frozen-lockfile
cd ..
/usr/local/bin/yarn lint

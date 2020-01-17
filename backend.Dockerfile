FROM node:12-slim

COPY package.json yarn.lock /tmp/app/
RUN yarn && yarn build 

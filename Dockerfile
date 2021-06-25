FROM node:alpine as build-deps 
WORKDIR /usr/src/app 
COPY package.json yarn.lock ./ 
RUN yarn 
COPY . ./ 
RUN yarn build 
 
FROM node:alpine 
WORKDIR /usr/src/app 
COPY --from=build-deps /usr/src/app/build ./build 
RUN yarn global add serve 
CMD ["serve", "-s", "build"]
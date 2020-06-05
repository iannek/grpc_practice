FROM node:lts-alpine
WORKDIR /usr/src/app
RUN npm install -g create-react-app
RUN npx create-react-app react-sample
WORKDIR /usr/src/app/react-sample
RUN npm install grpc grpc-web google-protobuf

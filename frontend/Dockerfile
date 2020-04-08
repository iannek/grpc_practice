FROM node:lts-alpine
WORKDIR /usr/src/app
RUN npm install -g create-react-app
#RUN npm install -g create-react-app grpc --unsafe-perm
RUN npx create-react-app react-sample --typescript
WORKDIR /usr/src/app/react-sample
#COPY ./react-sample/package.json /usr/src/app/react-sample/package.json
RUN npm install grpc grpc-web google-protobuf @types/google-protobuf


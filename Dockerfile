FROM node:carbon
# Create app directory
WORKDIR /usr/src/app
# Bundle app source
COPY . .
# npm install
RUN  npm install
# Run npm install --global grpc --unsafe-perm
EXPOSE 3000 9204
CMD [ "npm", "run", "debug" ]
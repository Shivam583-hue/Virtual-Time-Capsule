FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install pnpm
RUN npm install -g pnpm

RUN pnpm install
RUN pnpm install typescript

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "pnpm", "run", "server" ]

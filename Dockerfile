FROM node:14

WORKDIR /authapi

# COPY package.json and package-lock.json files
COPY package.json package-lock.json ./
COPY package*.json ./

COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

RUN npm install

COPY . .

# Generate prisma client
RUN npx prisma generate


CMD npm run start
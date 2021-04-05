FROM node:15.11.0-alpine AS build
WORKDIR /usr/src
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run dev

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/ /usr/share/nginx/html
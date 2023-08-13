# Stage 1: Build
FROM node:alpine as build
WORKDIR /app
COPY . . 
RUN npm install --legacy-peer-deps
RUN npm run build --prod
EXPOSE 54154

#Stage: 2 
FROM nginx:alpine
COPY --from=build /app/dist/gate_front /usr/share/nginx/html

# FROM node:18.16.0 AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install --legacy-peer-deps
# COPY . .
# # RUN npm run build

# EXPOSE 54154

# CMD npm run start
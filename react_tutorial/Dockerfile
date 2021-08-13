FROM node:alpine
EXPOSE 3000
WORKDIR /app
COPY app/package*.json /app/
RUN npm install
COPY app/ /app/
ENTRYPOINT npx serve -p 3000 build

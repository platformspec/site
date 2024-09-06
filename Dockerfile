FROM node:22.8-alpine

WORKDIR /app

RUN npm install vitepress@1.3.4

EXPOSE 5173

CMD npm run env -- vitepress dev --host 0.0.0.0 --port 5173


FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm i -g @nestjs/cli
RUN npm ci
RUN npm run build
CMD ["npm", "run", "start:prod"]
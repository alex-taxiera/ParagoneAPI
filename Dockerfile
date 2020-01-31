FROM node:12-alpine

RUN mkdir -p /paragone
WORKDIR /paragone

COPY . .
RUN npm ci --no-optional --only=prod

EXPOSE 3031
CMD ["npm", "start"]

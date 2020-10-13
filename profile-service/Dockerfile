FROM node:14

WORKDIR '/app'


ARG username
ARG password
ARG database
ARG port
ARG host

ENV user=$username
ENV password=$password
ENV database=$database
ENV port=$port
ENV host=$host

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]

EXPOSE 8080

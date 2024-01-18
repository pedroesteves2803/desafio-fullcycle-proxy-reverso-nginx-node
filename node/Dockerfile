FROM node:15

WORKDIR /usr/src/app

COPY . .

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it
    
EXPOSE 3000

CMD [ "node", "index.js" ]
FROM node:10.17.0-alpine

RUN mkdir -p /root/src/api
WORKDIR /root/src/api
ENV PATH /root/src/api/node_modules/.bin:$PATH

COPY . .

EXPOSE 5000

ENTRYPOINT ["npm","run","start"]

# This is docker build command: 
# docker build -t fptu-api .

# This is docker run command:
# docker run -d --name fptu-api -p 5001:5000 fptu-api:latest
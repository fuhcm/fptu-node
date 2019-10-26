FROM node:10.17.0-alpine

RUN mkdir -p /root/src/node
WORKDIR /root/src/node
ENV PATH /root/src/node/node_modules/.bin:$PATH

COPY . .

EXPOSE 5000

ENTRYPOINT ["npm","run","start"]

# This is docker build command: 
# docker build -t fptu-node .

# This is docker run command:
# docker run -d --name fptu-node -p 5001:5000 fptu-node:latest
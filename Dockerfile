FROM node:10

COPY . /backend

# Set backend the work directory
WORKDIR /backend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./backend/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

CMD [ "npm", "start" ]

#docker build -t ar-amenagement-docker .
#docker run -it -p 3000:3000 ar-amenagement-docker

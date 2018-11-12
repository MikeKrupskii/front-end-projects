FROM node:11.1.0


RUN npm install -g http-server


WORKDIR /sudoku


COPY package*.json ./
COPY package-lock*.json ./


RUN npm install


COPY . .


RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]

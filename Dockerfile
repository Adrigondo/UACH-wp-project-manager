FROM node
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD PORT=3000 npm start
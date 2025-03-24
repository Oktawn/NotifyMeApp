import express from 'express';
import { appConfig } from './config/appConfig';
import { dataSource } from './data-source';
import "reflect-metadata";

const app = express();
const port = appConfig.get("PORT");

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

async function main() {
  dataSource.initialize().then(() => {
    console.log("Database connected");
  }).catch((error) => {
    console.error("Database connection failed", error);
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

}

main();
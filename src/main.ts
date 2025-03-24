import express from 'express';
import { appConfig } from './config/appConfig';

const app = express();
const port = appConfig.get("PORT");

app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
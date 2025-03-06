import express from 'express';

import { router } from './src/routes/index.js';
import { generateCsvFile } from './src/services/index.js'
import { setupMiddleware } from './src/middleware/index.js';

const app = express();
const port = 8090;

// set up middlewares
setupMiddleware(app)

app.use('/transactions', router);

app.listen(port, () => {
  generateCsvFile();
  console.log(`Server running at http://localhost:${port}`);
});
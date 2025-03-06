import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from "cors";

function setupMiddleware(app) {
  app.use(bodyParser.json());
  app.use(cors());
  app.use(
    morgan(":status :method :url :date", {
    }),
  );
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });
}

export { setupMiddleware };
import express from 'express';
import bodyParser from 'body-parser';
import jobRouter from './routes/job.mjs';

const app = express();
// Add headers before the routes are defined
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.json());

app.get('/', async (req, res) => res.status(200).send('hola Mundo'));
try {
  jobRouter(app);
} catch (e) {
  console.log(e);
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});

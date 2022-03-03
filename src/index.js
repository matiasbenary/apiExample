import express from 'express';
import bodyParser from 'body-parser';
import jobRouter from './routes/job.mjs';

const app = express();

app.use(bodyParser.json());

app.get(`/`, async (req, res) => {
  return res.status(200).send("hola Mundo");
});
jobRouter(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});

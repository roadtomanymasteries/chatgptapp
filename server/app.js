const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const configuration = new Configuration({
  organization: process.env.OPENAPI_ORGANISATION,
  apiKey: process.env.OPENAPI_APIKEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  const cors = require('cors');
  app.use(cors());
}

app.post('/', async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  res.json({
    message: response.data.choices[0].text,
  });
});

module.exports = app;

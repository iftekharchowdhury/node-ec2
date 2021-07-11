const { response } = require('express')

const express = require('express');
const app = express();
const port = 80;


  

app.get('/status', (req, res) => res.send({status: "I'm alive!"}));

app.get('/api/v1/internal', (request, response) => {
    response.send('Some data from internal server World')
  })


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
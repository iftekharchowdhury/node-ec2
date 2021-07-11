const express = require('express');
const axios   = require('axios')

const port = 8081;

const app = express();

app.use(express.json())


const internalURL = "http://172.17.0.2:80/api/v1/internal"

app.get('/status', (req, res) => res.send({status: "I'm alive!"}));

app.get('/', (request,response) => {
    response.send('External service')
})

app.get('/api/v1/add',async (request,response)=>{

    console.info('requesting ', internalURL)
    console.warn('make sure the internal URL is correct. If incorrect, change the "internalURL" variable and restart the container')
  
    try{
      // request to the internal service 
      const internalServiceResponse = await axios.get(internalURL)
      
      const exrternalServiceResponse = {
        msg: 'request success',
        internal_service_response: internalServiceResponse.data
      }
  
      // send the response to the public internet
      response.send(exrternalServiceResponse)
    } catch(err){
      // handle the error and send response
      const errResponse = {
        msg: 'got error', err
      }
      response.send(errResponse)
      // console.log(err)
    }
  })


app.listen(port, () => console.log(`External port listening ${port}!`));
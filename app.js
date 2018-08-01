const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 9000;
const data = require('./students')

app.use(cors());


app.get('/', (req, res, next) =>{
  res.status(200).json({data});
})

const getById = (params, data) => {
  for(let i = 0; i < data.length; i++){
    let holderString = data[i].ID.toString();
    if(params === holderString){
      return data[i];
    }
  }
  return null;
}

app.get('/:id', (req,res,next) => {
  const student = getById(req.params.id, data);
  if(!student){
    res.status(400).json({
      data:{
        message: 'Not Found!'
      }
    })
  } else {
    res.status(200).json({student})
  }
})


app.listen(port, () =>{
  console.log(`listening on port ${port}`)
})

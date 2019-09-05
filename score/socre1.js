function callScore(req,res){

  var spawn = require('child_process').spawn;
  var processo = spawn(`python`, ['score.py'])
  
  
  processo.stdout.on('data', function(data){
    //dataString += data.toString();
  
    
    console.log(res.send(data.toString()));
  });
  
  }
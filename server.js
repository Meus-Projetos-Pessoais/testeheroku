const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const  Cliente = require('./schema/schema');
const score = require('./score/score')
const MongoClient = require('mongodb').MongoClient 
const uri = "mongodb+srv://tech:tech@cluster0-0ngrx.mongodb.net/test?retryWrites=true&w=majority"
//const mongoose =  require('mongoose')
const cors =  require('cors')
//mongoose.connect('mongodb+srv://tech:tech@cluster0-0ngrx.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});


MongoClient.connect(uri, (err, client) => {
    if(err) return console.log(err)
    db = client.db('acredita');
    
    app.listen(5000,() => {
        console.log("Server rodando ")
    });
})

app.get('/', (req, res)=> {
    res.render('index.ejs')
});

app.use(bodyParser.urlencoded({extended : true}))

app.listen(3000, function(){});

app.get('/cadastro', (req, res) => {

    res.render('cadastro.ejs')

    let cursor =  db.collection('acredita').find();
});



app.post('/show', (req, res) =>{
    //console.log(req.body)
    db.collection('acredita').save(req.body, (err, result)=>{
        if(err) return console.log(err)
        
        console.log('Dados salvo com sucesso.');
    res.redirect('/cadastro')
    })
});

app.get('/show', (req, res) => {
    db.collection('acredita').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })
    })
});


app.route('/delete/:id')
.get((req,res) => {
    var id = req.params.id
    var ObjectId = require('mongodb').ObjectID;
    db.collection('acredita').deleteOne({_id:ObjectId(id)}, (err, result)=>
    {
        if(err) return res.send(500, err)

        console.log('Cliente deletado da base de dados');
        res.redirect('/show');
    }
    )

});
app.route('/edit/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('acredita').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('edit.ejs', { data: result })
  })
})
.post((req, res) => {
    var id = req.params.id
    var nome = req.body.nome
    var cpf = req.body.cpf
    var cep = req.body.cpf
    var rua = req.body.rua
    var numero = req.body.numero
    var bairro = req.body.bairro

  db.collection('acredita').updateOne({_id: ObjectId(id)}, {
    $set: {
        nome : nome,
        cpf : cpf,
        cep:cep,
        rua:rua,
        numero:numero,
        bairro:bairro
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show')
    console.log('Atualizado no Banco de Dados')
  })
})
const express = require('express');
const app = express()
const data = require("./data.json");

//verbos HTTP(GET, POST, PUT, DELETE)

app.use(express.json());

//pegar dado da API
app.get("/clients",function(req,res){
 res.json(data);
});

app.get("/clients/:id",function(req,res){
    const {id} = req.params
    const client = data.find(cli => cli.id == id);

    if(!client) return res.status(204).json();

    res.json(client);
   });

//Enviar dados para API   
app.post("/clients",function(req,res){
    const {name, email} = req.body;
    //save
    res.json({name, email});
});

//Atualizar dados da API
app.put("/clients/:id",function(req,res){
    const {id} = req.params
    const client = data.find(cli => cli.id == id);

    if(!client) return res.status(204).json();

    const {name, email} = req.body;
    client.name = name;
    client.email = email;

    res.json(client);

});

//Deletar dados da API
app.delete("/clients/:id",function(req,res){
    const {id} = req.params
    const clientFiltered = data.filter(client => client.id != id);

    res.json(clientFiltered);
});


app.listen(3000, function(){
    console.log("server is running");
});
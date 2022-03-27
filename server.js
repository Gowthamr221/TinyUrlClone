require('dotenv').config()
const express =  require('express');
const bodyParser = require('body-parser')
const ejs = require('ejs');
const mongoose = require('mongoose')
const NodeCache = require( "node-cache" );
const { url } = require('inspector');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('connected',()=>{
    console.log('db connected')
})

var SaveUrlSchema =new mongoose.Schema({
    shorturl : {
        type:String,
       
    },
    fullurl: {
        type:String,
       
    }
})
const SaveUrl = mongoose.model('SaveUrl',SaveUrlSchema);
const PORT = process.env.PORT || 3000;
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('pages/index');
})

app.post('/',(req,res)=>{
    const TempData = new SaveUrl({shorturl:req.body.shorturl,fullurl:req.body.fullurl});
    TempData.save((e)=>{
        if(e){
            console.log(e)
        }
    });
    res.render('pages/result',{fullurl :req.body.fullurl,shorturl:req.body.shorturl})
})

app.listen(PORT,()=>{
    console.log(`server is up and running on PORT: ${PORT}`);
})
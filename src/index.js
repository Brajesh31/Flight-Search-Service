const express=require('express')
const {PORT}=require('./config')
const apiRoutes=require('./routes') 

const cors = require('cors');

const app=express()

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',apiRoutes)

app.listen(PORT,async ()=>{
    console.log(`Sever Running on port :${PORT}`) 
})
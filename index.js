const express = require('express')
const path = require('path')
const cors = require('cors');

const app = express();

// app.get('/manas',(req,res) =>{
//     res.send("Bhai padh loon")
// })

// app.post('/manas',(req,res) =>{
//     res.send("Bhai padh loon phir se")
// })
// app.use('/manas',(req,res) =>{
//     res.send("koi farak nhi hai")
// })
// const middleware = (req,res,next) =>{
//     console.log("Aur le loon majee!!")
//     next();
// }

// app.get('/manas',middleware,(req,res) =>{
//     res.send("Ab kuch lag raha hai")
// })
app.use(cors())


app.use(express.json())

app.use('/api/members',require('./routes/api/members'))//localhost:3000/members


app.use(express.static(path.join(__dirname,'public')))

const PORT = 5000;
app.listen(PORT,()=>console.log(`Server is running at ${PORT}`))
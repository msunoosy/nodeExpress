const express=require('express')
const app=express();
const cors=require('cors')
const path=require('path')
const logEvents=require('./logEvents')

const PORT = process.env.PORT || 3500;

app.use(cors())
app.use(express.urlencoded({extended:'false'}))
app.use(express.json())

app.use((req,res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
    console.log(`${req.method} ${req.url}`)
    next()
})

app.use(express.static(path.join(__dirname,'./public')))

app.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'))
})

app.get('/newpage(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','new-page.html'))
})

app.get('/oldpage(.html)?',(req,res)=>{
    res.redirect(301,'newpage.html')
})

app.get('/*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})

app.listen(PORT,()=>console.log(`SERVER IS RUNNING ON ${PORT}`))
//importing express framework
const express=require("express")
const jwt=require("jsonwebtoken")
//importing cors library
const cors=require("cors")
const dataservice=require("./services/data.service")
//creating server app
const app=express()
app.use(cors({
    origin:"http://localhost:4200"
}))
// to parse json into js
app.use(express.json())
//middleware
const appMiddleware=(req,res,next)=>{
    try{
        token=req.headers["x-access-token"]
        result=jwt.verify(token,"secretsuperkey1234")
        req.currentacno=result.currentacno
        console.log(result)
         console.log("middleware is acting") 
         next()
    }
    catch{
        res.status(400).json({
            status:false,
            message:"invalid user... please login",
            statusCode:400
        })
        
    }
    
// next()
}
//app specific mw
// app.use(appMiddleware)

//resolving request
//GET-retrive
app.get('/',(req,res)=>{
    res.send("GET request hit")
    
})
//post-create
//resolving request
// register api
app.post('/register',(req,res)=>{
    // res.send("post request hit")
    const result=dataservice.registration(req.body.acno,req.body.uname,req.body.phone,req.body.psw)
    // if(result.status==true)
    // {
    //     res.status(result.statusCode).json(result)
    // }
    // else{
    //     res.status(result.statusCode).json(result)
    // }
   // res.send("success")
   result.then(resobj=>{
    res.status(resobj.statusCode).send(resobj)
   })
})
// login api
app.post('/login',(req,res)=>{
    console.log('log')
  const result=dataservice.login(req.body.acno,req.body.psw)
 // res.status(result.statusCode).json(result)
 result.then(resobj=>{
    res.status(resobj.statusCode).send(resobj)
   })
})
//deposit api
app.post('/deposit',appMiddleware,(req,res)=>{
    console.log("dep")
    const result=dataservice.deposit(req.body.acc,req.body.pswd,req.body.amnt,req)
    //res.status(result.statusCode).json(result)
    result.then(resobj=>{
        res.status(resobj.statusCode).send(resobj)
       })
})
// withdrawl api
app.post('/withdraw',appMiddleware,(req,res)=>{
    const result=dataservice.withdraw(req.body.acc,req.body.pswd,req.body.amnt,req)
    //res.status(result.statusCode).json(result) 
    result.then(resobj=>{
        res.status(resobj.statusCode).send(resobj)
       })  
})
//transact api
app.post('/transact',appMiddleware,(req,res)=>{
    const result=dataservice.getTransaction(req.body.acc)
    //res.status(result.statusCode).json(result)  
    result.then(resobj=>{
        res.status(resobj.statusCode).send(resobj)
       })   
})
app.delete('/delete/:acc',appMiddleware,(req,res)=>{
    const result=dataservice.deleteaccountt(req.params.acc)
    result.then(resobj=>{
        res.status(resobj.statusCode).send(resobj)
    })
})
//put-update 
app.put('/',(req,res)=>{
    res.send("put request hit")
    
})
//delete-delete
app.delete('/',(req,res)=>{
    res.send("delete request hit")
    
})
//patch-update partially
app.patch('/',(req,res)=>{
    res.send("patch request hit")
    
})
//configuring port number for app 
app.listen(3000,()=>{
console.log("server running on port 3000")
})
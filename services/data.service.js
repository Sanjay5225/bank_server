//importing jwt package
//importing db.js
const db=require("./db")
const jwt=require("jsonwebtoken")
accounts={
    1000:{account_no:1000,name:"sanjay",phone:954826752,balance:54222,password:"sanju123",transaction:[]},
    1001:{account_no:1001,name:"akhil",phone:954826749,balance:64222,password:"akhil123",transaction:[]},
    1002:{account_no:1002,name:"ajmal",phone:954826781,balance:44222,password:"ajmal123",transaction:[]},
    1003:{account_no:1003,name:"arun",phone:954826717,balance:5222,password:"arun123",transaction:[]},
  }
const registration=(acno,uname,phone,psw)=>
    {
    return db.Account.findOne({
      account_no:acno
    }).then(acc=>{
      console.log(acc)
      if(acc){ 
        return {
             status:false,
             message:"Account already exist!...Please login ",
             statusCode:404
           }

        
      }
      else{
        let accnt=new db.Account({
          account_no:acno,
          name:uname,
          phone:phone,
          balance:0,
          password:psw,
          transaction:[]
        })
        accnt.save()
        return{
          status:true,
         message:"Registration Completed",
          statusCode:201
        }
      }
    })
      // if(acno in accounts)
      // {
      //   //alert("account no already exist")
      //   return {
      //     status:false,
      //     message:"Account already exist!...Please login ",
      //     statusCode:404
      //   }
      // }
      // else{
      //   accounts[acno]={account_no:acno,name:uname,phone:phone,balance:0,password:psw,transaction:[]}
      //  console.log(accounts)

      //   return{
      //     status:true,
      //     message:"Registration Completed",
      //     statusCode:201
      //   }
      // }
    }
   const login=(acno,psw)=>
    {
      return db.Account.findOne({
        account_no:acno,
        password:psw
      }).then(res=>{
        if(res){
          currentUser=res.name
          currentacno=acno
          token=jwt.sign(
            //acno of current user
            {currentacno:acno},"secretsuperkey1234"
          )
            
          
          // this.saveDetails()
          return {
            status:true,
            message:"Login Successful",
            statusCode:200 ,
            currentUser,
            currentacno,
            token
          }
        }
        else{
          return {
            status:false,
            message:"invalid password or Account no",
            statusCode:400
          }
        }
      })
      if(acno in accounts)
      {
        if(accounts[acno].password==psw)
        
        {
          currentUser=accounts[acno].name
          currentacno=acno
          token=jwt.sign(
            //acno of current user
            {currentacno:acno},"secretsuperkey1234"
          )
            
          
          // this.saveDetails()
          return {
            status:true,
            message:"Login Successful",
            statusCode:200 ,
            currentUser,
            token
          }
        }
        else 
        {
          return {
            status:false,
            message:"invalid password",
            statusCode:400
          }
        }}
        else{
          return{
            status:false,
            message:"invalid account number",
            statusCode:400
          }
        }
        }
        const deposit=(acc,pswd,amnt,req)=>
        {
          return db.Account.findOne({
            account_no:acc,
            password:pswd

          }).then(res=>{
            if(res)
            {
              if(res.account_no!=req.currentacno)
              {
                return{
                  status:false,
                  message:'Given account no is not  authenticated',
                  statusCode:422
                }
               }
               else{
                console.log(res)
                res.balance+=parseInt(amnt)
                let details={"Type":"CREDIT","Amount":parseInt(amnt)}
                res.transaction.push(details)
                res.save()
                return{
                  status:true,
                  message:"amount deposited to your balance is"+res.balance,
                  statusCode:200 
                }
              }
               }
              
            else{
              return{
                status:false,
                message:"invalid password or account no",
                statusCode:400
              }
            }
            
          }).catch(err=>console.log(err))
          if(acc in accounts)
          {
            if(accounts[acc].password==pswd)
            {
              accounts[acc].balance+=parseInt(amnt)
              // this.saveDetails()
               let details={"Type":"CREDIT","Amount":parseInt(amnt)}
              accounts[acc].transaction.push(details)
              // this.saveDetails()
              // alert("balance is :"+this.accounts[acc].balance)
              return {
                status:true,
                message:"amount deposited to your balance is"+accounts[acc].balance,
                statusCode:200
              }
            }
            else{
              return {
                status:false,
                message:"invalid password",
                statusCode:400
              }
            }}
            else{
              return {
                status:false,
                message:"invalid account no",
                statusCode:400
              }
            }}
        const withdraw=(acc,pswd,amnt,req)=>
    {
      return db.Account.findOne({
        account_no:acc,
        password:pswd
      }).then(res=>{
        if(res){
          if(res.account_no!=req.currentacno)
          {
            return{
              status:false,
              message:'Given account no is not  authenticated',
              statusCode:422
            }
           }
           else{
          if(res.balance<amnt)
          {
            return{
              status:false,
              message:"insufficient balance",
              statusCode:422

            }
          }
          else{
            res.balance-=parseInt(amnt)
            let details={"Type":"DEBIT","Amount":parseInt(amnt)}
              res.transaction.push(details)
              res.save()
              return{
                status:true,
              message:"withdrawal successful.balance is"+res.balance,
              statusCode:200
              }
          }
           }
          
        }
        else{
          return{
            status:false,
            message:"invalid account no or password",
            statusCode:422
          }
        }
      })
      if(acc in accounts)
      {
        if(accounts[acc].password==pswd)
        {
          if(accounts[acc].balance<amnt)
          {
            return{
              status:false,
              message:"insufficient balance",
              statusCode:422
            }
          }
          else{
            accounts[acc].balance-=parseInt(amnt)
            let details={"Type":"DEBIT","Amount":parseInt(amnt)}
            accounts[acc].transaction.push(details)
            // this.saveDetails()
            
            // alert("balance is :"+this.accounts[acc].balance)
            return {
              status:true,
              message:"withdrawal successful.balance is"+accounts[acc].balance,
              statusCode:200
            }
          }
         
        }
        else{
          return{
            status:false,
            message:"invalid password",
            statusCode:422
          }
        }}
        else{
          return {
            status:false,
            message:"invalid account no",
            statusCode:422

          }
        }
    }
   const getTransaction=(acc)=>
    {
      return db.Account.findOne({

        account_no:acc
      }).then(res=>{
        if(res)
        {
          return{
            status:true,
            message:"success",
            data:res.transaction,
            statusCode:200 
          }
        }
        else{
          return{
            status:false,
          message:"failiure",
          statusCode:422
          }
        }
      })
      
      if(acc in accounts)
      {
      return {
        status:true,
        message:"success",
        data:accounts[acc].transaction,
        statusCode:200
      }
      }
      else{
        return{
          status:false,
          message:"failiure",
          statusCode:422
        }
      }
    }

    const deleteaccountt=(acc)=>{
      return db.Account.deleteOne({
        account_no:acc
      }).then(res=>{
        if(res){
        return{
          status:true,
          message:"deletion successful",
          statusCode:200
        }}
        else{
          return{
            status:false,
            message:"deletion failed",
            statusCode:400
          }
        }
      })
    }







module.exports={
    registration,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteaccountt
  

}
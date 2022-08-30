const express = require("express");
const bodyParser=require("body-parser");
const app=express();
const sql=require("mssql/msnodesqlv8");
const cors=require("cors");
const { request } = require("express");

var config={
    database:"employeedetails",
    server: "NUSYS-600\\SQLEXPRESS",
    driver:"msnodesqlv8",
    options:{
        trustedConnection:true
    }
};
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));



app.get("/api/get",(req,res)=>{

    sql.connect(config,(err)=>{
        if(err){
            console.log(err);
        }
         var reqq=new sql.Request();
        const sqlSelect="select * from empdetails"
        reqq.query(sqlSelect,(err,recordset)=>{
            if(err){
                console.log(err);
            }
            else{
               res.send(recordset);
               
            }
        });
        
    });
    
});


app.post("/api/insert",(req,res)=>{
    const empid = req.body.empid;
    const empname = req.body.empname;
    const empdate = req.body.empdate;
    const empexperience=req.body.empexperience;
    const empaddress=req.body.empaddress;
    
    sql.connect(config,(err)=>{
        if(err){
            console.log(err);
        }

        var request= new sql.Request();
    const sqlInsert = "insert into empdetails(empid,empname,empdate,empexperience,empaddress) values ('" +empid+"','"+empname+"','"+empdate+"','"+empexperience+"','"+empaddress+"')";
    request.query(sqlInsert,[empid,empname,empdate,empexperience,empaddress],(err,recordset)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(recordset);
        }
    });
});
   res.send("express here")
   console.log("success"); 
   console.log(empname)
})

app.get("/",(req,res)=>{
    res.send("express here")
})

app.listen(3001,(req,res)=>{
    // res.send("express here");
    console.log("server is running on 3001");
})
const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
const https=require('https');
const app=express();
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));



app.get("/",function(req,res){
  res.sendFile(__dirname+"/SignUp.html");
});

app.post("/",function(req,res){
  const FirstName=req.body.fname;
  const LastName=req.body.lname;
  const Email=req.body.email;
  const data={
    members:[
      {
        email_address:Email,
        status:"subscribed",
        merge_fields:{
          FNAME: FirstName,
          LNAME: LastName
        }
      }
    ]

   }
  const jsonData=JSON.stringify(data);
  const url="https://us8.api.mailchimp.com/3.0/lists/6eb3acc00f";
  const options={
    method:"POST",
    auth:"rakshith:d97668c39e656d3fc39404bb929b308b-us8"
  }
const request=https.request(url,options,function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html")
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();

});

//Api key   d97668c39e656d3fc39404bb929b308b-us8
app.post("/failure",function(){
  res.redirect("/");
});


app.listen(process.env.PORT||3000,function(){
  console.log("hii welcome to server");
})

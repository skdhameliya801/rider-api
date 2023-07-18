const mongoose = require("mongoose")
const cors = require('cors')
const bcrypt = require("bcrypt")
const express = require("express");
const app = express();
app.use(cors())
app.use(express.json());

require("./db-connection.js")
const schema = require("./models/rider.js")


app.get('/', (req, res) => {
    res.json("<h1>Rider..</h1>");
});

app.post('/register_rider', async(req, res) => {

  const hash = await bcrypt.hash(req.body.password, 10);

  const user_found = await schema.scheme_user_login.findOne({whatsapp_no : req.body.whatsapp_no});
  if(user_found != null){
    res.json({
      message : "whatsapp no is already present, choose different whatsapp no",
      user_data : user_found
    })
  }
  else{    
    const add_rider = new schema.scheme_user_login(
      {
        whatsapp_no : req.body.whatsapp_no,
        password : hash,
        security_code : req.body.security_code,
        full_name : req.body.full_name
      }
    )
    let response = await add_rider.save();
    res.json({
      message : "Rider is added successfully.",
      user_data : response
    })
  }
});

app.patch('/forgot_password_rider', async(req, res) => {
  console.log(req.body)
  
  const hash = await bcrypt.hash(req.body.password, 10);
  
  const rider_data = await schema.scheme_user_login.updateOne(
      { whatsapp_no : req.body.whatsapp_no,
        security_code : req.body.security_code
      },
      {
        $set : {
          "password" : hash
        }
      }
    );
    console.log(rider_data)
    if(rider_data.modifiedCount > 0){
      res.json({
        message : "Password set successfully. You can login now.",
        user_data : rider_data,
        response : true
      }) 
    }else{
      res.json({
        message : "Failed to set password. Please check WhatsApp no or Security code.",
        user_data : rider_data,
        response : false
      }) 
    }
  // if(user_login_found != null){
  //   if(user_login_found.security_code == req.body.security_code){
  //     // same security code
  //     res.json({
  //       // message : "Rider can set new password.",
  //       message : "Password set successfully",
  //       user_data : user_login_found,
  //       response : true
  //     })
  //   }
  //   else{
  //     // wrong security code
  //     res.json({
  //       message : "Wrong security code. Rider cannot set new password.",
  //       user_data : user_login_found,
  //       response : false
  //     })
  //   }
  // }
  // else{
  //   // user not found
  //   res.json({
  //     message : "Rider not found",
  //     user_data : user_login_found,
  //     response : false
  //   })
  // }
});

app.post('/login_rider', async(req, res) => {
  const user_login_found = await schema.scheme_user_login.findOne({whatsapp_no : req.body.whatsapp_no});
  if(user_login_found != null){
    const result_bool = await bcrypt.compare(req.body.password, user_login_found.password);

    if(result_bool){
      res.json({
        message : "user found",
        user_data : user_login_found,
        response : true
      }) 
    }
    else{
      res.json({
        message : "wrong password",
        user_data : user_login_found,
        response : false
      }) 
    }
  }else{
    // null
    res.json({
      message : "user not found",
      user_data : user_login_found,
      response : false
    })
  }

});

app.patch('/on_off_rider', async(req, res) => {
  console.log(req.body)
  const rider_data = await schema.scheme_user_login.updateOne(
    {whatsapp_no : req.body.whatsapp_no},
    {
      $set : {
        "on_off_rider" : req.body.on_off_rider
      }
    }
  )
  
  if(rider_data.modifiedCount > 0){
    res.json({
      message : "rider status is updated successfully",
      user_data : rider_data,
      response : true
    }) 
  }else{
    res.json({
      message : "rider status is failed to update",
      user_data : rider_data,
      response : false
    }) 
  }
});

app.get('/admin007/:start_n', async(req, res) => {
  const start_n = req.params.start_n

          const all_riders = await schema.scheme_user_login.find({on_off_rider : true})
                          // .sort({ "add_time":-1 })
                          .skip(start_n)
                          .limit(10)
          res.json(all_riders)
});

app.get('*', (req, res) => {
    res.json("<h1>404</h1>");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is listening portt ${PORT}`);
});
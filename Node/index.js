const express = require("express");
const bodyParser = require('body-parser');
const { mongoose } = require('./db.js');
var employeeController = require ('./controllers/employeeController.js');

var port = 3000;
var app = express();
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/employees',employeeController);//base URL for router


 app.get("/reg",(req, res) => {
  res.render('reg');
}); 

app.route('/login')
    .get((req, res) => {
      res.render(__dirname + '/views/login.ejs');
    })
    .post((req, res) => {
        var email = req.body.email, password = req.body.psw;
        User.findOne({ "Email": email,"Password":password }).then(function(data){
          if (!data) {
            res.redirect('/login');
        } else{
          req.session.item = data;
          if(typeof req.session.item !== "undefined" || req.session.item === true){console.log("session set successfully after login");}
          else{console.log("session not set after login");}
          res.redirect('/getdata');
        }
        })
       }); 

        app.get('/logout', (req, res) => {
          if (req.session.item && req.cookies.user_sid) {
              res.clearCookie('user_sid');
              res.redirect('/');
          } else {
              res.redirect('/login');
          }
      });
      

app.use(bodyParser.json())

app.post("/page2", (req, res) => {  
  res.render('page2',{ body: req.body});
});

app.get("/view/:id", (req, res) => {  
  User.findOne({"_id": req.params.id })
    .then(function(data){
       if (!data) 
        res.send("No Data recive");
    else
        res.render('page2',{"data": data});
    })
})
app.post("/update", (req, res) => {
  User.findOneAndUpdate({ _id: req.body.id},{$set: {Name: req.body.Name,
                                                    lastName: req.body.lastName,
                                                    midelname: req.body.midelname,
                                                    birthday: req.body.birthday,
                                                    dateofjoin:req.body.dateofjoin,
                                                    Address1: req.body.Address1,
                                                    zipcode: req.body.zipcode,
                                                    city: req.body.city,
                                                    Country :req.body.Country,
                                                    code:req.body.code,
                                                    Mobile_Number :req.body.Mobile_Number,
                                                    Gender: req.body.Gender,
                                                    Hobby: req.body.Hobby,
                                                    Email:req.body.Email,
                                                    Password: req.body.Password,
                                                    image: req.body.image,
                                                    Blood_Group:req.body.Blood_Group,
                                                    Roal: req.body.Roal,
                                                    Interest:req.body.Interest,
                                                    message:req.body.message
                                                  }}, function(err) {
  if (!err) {
      res.redirect('getdata');
    }
    else {
      res.send('Data not update');
    }
  });
});

app.put("/update/:id", (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id},{$set: { Name: req.body.Name,lastName: req.body.lastName,midelname: req.body.midelname,birthday: req.body.birthday,Address1: req.body.Address1,Address2: req.body.Address2,city: req.body.city,Country :req.body.Country,Mobile_Number :req.body.Mobile_Number,Gender: req.body.Gender,Hobby: req.body.Hobby,Email:req.body.Email,Password: req.body.Password,image: req.body.image, Roal: req.body.Roal}}, function(err) {
  if (!err) {
      res.send("item update in database");
    }
    else {
        res.send("item not update in database");
    }
  });
});



app.listen(port, () => {
 console.log("Server listening on port " + port);
});


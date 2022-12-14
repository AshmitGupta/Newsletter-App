const express = require('express');
const bodyParser = require('body-parser')
const request = require("request");
const https = require('https');

const app  = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req,res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    
    const url = "https://us8.api.mailchimp.com/3.0/lists/ffd631dab4";

    const options = {
        method: 'POST',
        auth: "ashmit:746d98fa47ae1dec833abe6dcc76cec5-us8"
    };

    const request = https.request(url, options, function(response) {

        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failiure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failiure", function(req,res) {
    res.redirect('/');
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on 3000");
});

// 746d98fa47ae1dec833abe6dcc76cec5-us8
// ffd631dab4

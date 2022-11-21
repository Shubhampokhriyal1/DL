const express = require('express')
const mongoose = require('mongoose')
const Sign = require('./model/logininfo')
const app = express();
require('dotenv').config()
const dbURI = process.env.connect
var log = 0;
var resu=-1;
var errmsg="";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(process.env.PORT, () => {
            log = 0;
            resu=-1;
            errmsg="";
        })
    })
    .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var username = 'Sign'
app.set('view engine', 'ejs');

app.get('/register', (req, res) => {
    res.render('register', { username,errmsg,log });
})



app.post('/register', async (req, res) => {
    // console.log(req.body);
    try{
        const email = req.body.email;
        // const password = req.body.password;

        const details = await Sign.findOne({ email: email });

        try {
            if(req.body.confirmpassword != req.body.password) {
                redirect(303, '/register');
                log=0;
            }
            else{
                const signdet = new Sign({
                    email: req.body.email,
                    fname: req.body.fname,
                    sname: req.body.sname,
                    password: req.body.confirmpassword
                });
                username = req.body.fname;
                log=1;
                res.redirect(301, '/home');
                signdet.save();
            }
        }
        catch (err) {
            redirect(303, '/register');
            console.log(err);
        }
    }
    catch (err) {
        errmsg="already registered by this email";
        res.redirect(301,'/register')
    }
})


app.get('/sig=8n', (req, res) => {
    log = 0;
    resu=-1;
    errmsg="";
    res.render('sign', { username ,errmsg,log })
})




app.get('/home', (req, res) => {
    res.render('home', { username, log });
})


const multer = require ('multer');
const { stringify } = require('querystring');
const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'Images')
    },
    filename : (req, file, cb) => {
        console.log(file)
        cb(null, "img.jpeg");
    }
})


const upload=multer({storage: storage})

app.get('/result', (req, res) => {
    res.render('result', { username,resu });
})


app.get('/load9ing', (req, res) => {
    res.render('loading', { username,resu,log });
})


app.post('/home', upload.single("image") , async(req, res) => {
        console.log(req.file)
        const { spawn } = require('child_process');
        const childPython = spawn('python', ['prediction.py']);
        resu=-1;
        childPython.stdout.on('data', (data) => {
            if("0=84&1=114&2=117&3=101&4=13&5=10"==stringify(data)){
                // res.redirect(301, '/p12ti1=5v%+-e');
                resu=1;
            }
            else if("0=70&1=97&2=108&3=115&4=101&5=13&6=10"==stringify(data)){
                // res.redirect(301, '/n12g1t=5v%+-e');
                resu=0;
            }
            
        });
        childPython.stderr.on('data', (data) => {
            // console.log(`stderr: ${data}`);
        });
        childPython.on('close', (code) => {
            // console.log(`exit code: ${code}`);
        });
        res.redirect(301, '/load9ing');
})

// app.get('/createtest', (req, res) => {
//     res.redirect(301, '/sign');
// })



app.post('/sign', async (req, res) => {
    try {

        const email = req.body.email;
        // const password = req.body.password;

        const details = await Sign.findOne({ email: email });
        var b = req.body.password == details.password;
        if (b) {
            log =1;
            username = details.fname;
            res.redirect(301, 'home');
        }
        else {
            log = 0;
            username = 'Sign'
            res.redirect(301, '/sig=8n');
        }
    }
    catch (error) {
        errmsg="incorrect email or password";
        res.redirect(301, '/sig=8n');
    }
})
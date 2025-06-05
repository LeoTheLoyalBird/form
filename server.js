const express = require("express");
const { url } = require("inspector");
const mongoose = require("mongoose");
const path = require("path")

const port = 3200;

const app = express()
app.use(express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mongoose.createConnection('mongodb+srv://thisizneodev:4UjXUJ4zPbxR2tH4@cluster0.rv813dt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

db.on('connected', () => {
    console.log("Db is connected successfully")
})

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

const jobsSchema = new mongoose.Schema({
    fn: String,
    ea: String,
    ad: String,
    ct: String,
    zp: String,
    tph: String,
    sd: String,
    cv: String,
})

const Jobs = mongoose.model("JobsData", jobsSchema)

app.post('/Applying', async (req, res) => {
    const {fn, ea, ad, ct, zp, tph, sd, cv} = req.body
    const jobs = new Jobs({
        fn,
        ea,
        ad,
        ct,
        zp,
        tph,
        sd,
        cv
    })
    await jobs.save()
    res.sendFile(path.join(__dirname, 'success.html'))
})

app.listen(port, () =>{
    console.log('Server Is Listenning...')
})
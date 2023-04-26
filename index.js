// import data service file
const dataService = require('./service/dataservice')

//import cors
const cors = require("cors")

const express = require("express")
const app = express()

//connection string to frontend integration
app.use(cors({ origin: 'http://localhost:4200' }))

//to parse json data from req body(to server)
app.use(express.json()) //all datas coming to express will be converted to js from json


app.post('/signup', (req, res) => {

    dataService.signup(req.body.email, req.body.password, req.body.name).then(result => {
        res.status(result.statusCode).json(result)

    })


})

app.post('/login', (req, res) => {

    dataService.login(req.body.email, req.body.password).then(result => {
        res.status(result.statusCode).json(result)

    })


})

app.post('/taskdata', (req, res) => {
    dataService.taskdata(req.body.email).then(result => {
        res.status(result.statusCode).json(result)

    })
})

app.post('/addtask', (req, res) => {

    dataService.addtask(req.body.email, req.body.task).then(result => {
        res.status(result.statusCode).json(result)
    })

})

app.post('/edittask/:id', (req, res) => {
    dataService.edittask(req.body.email, req.params.id, req.body.task).then(result => {
        res.status(result.statusCode).json(result)

    })
})

app.post('/deletetask/:id', (req, res) => {
    dataService.deletetask(req.body.email,req.params.id).then(result => {
         res.status(result.statusCode).json(result)
         
    })
})











app.listen(3000, () => { console.log("server started at port number 3000"); })
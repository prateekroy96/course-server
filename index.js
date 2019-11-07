const express = require('express')
const app = express();
const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

port = process.env.PORT || 4201

// Allow any method from any host and log requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
})

app.use(express.static('dist/course-manager'));

app.use('/', router, (req, res) => {
    console.log("to router")
})

app.listen(port, () => console.log("Server running on:" + port))

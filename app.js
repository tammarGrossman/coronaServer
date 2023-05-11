var express = require('express');
const workers = require("./routs/workersRouts");
const corona = require("./routs/coronaRouts");
const vaccinations = require("./routs/vaccinationRouts");
var app = express();
const cors = require("cors");
var corsOptions = {
    origin: '*',
    credentials: true,
    methods: "*",
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/workers", workers)
app.use("/corona", corona)
app.use("/vaccinations", vaccinations)
app.listen(8080)
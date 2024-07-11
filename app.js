const express = require("express");
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
const app = express();
const elevators = require("./elevators.js")
const agents = require("./agents.js")


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;

app.get("/status", (req, res) => {
  res.send(system.getenv(ENV_NAME));
  res.send(system.getenv(PORT));
});
app.get("/hello", (req, res) => {
  res.send("Hello World");
});
// app.get("/residential", (req, res) => {
//   residential;
// });

// below const entries for residential quote calc
app.get("/residential", (req, res) => elevators.residential(req,res));

app.get("/error", (req, res) => {
  res.status(500).send("Error");
});


app.get("/email-list", (req, res) => {
  console.log(agents.agents)
  const emails = agents.agents.map(agent => agent.email);
    res.send(emails)
});

app.get("/region-avg", (req, res) => {
  console.log("region-avg");
});

app.get("/calc-residential", (req, res) => {
  console.log(calc - residential);
});



app.get("/agents", (req, res) => {
  const region = "north";
  //replace above line with commented code line below for actual functionality of accepting a vatiable for region
  // const region = req.query.region.toLowerCase;

  if (!region) {
    return res.status(400).json({ error: "Region value is required" });
  }

  const filteredAgents = agent.filter(
    (agent) => agent.region.toLowerCase() === region.toLowerCase()
  );

  if (filteredAgents.length === 0) {
    return res
      .status(404)
      .json({
        message: `No agents were found in the supplied region: ${region}`,
      });
  }

  const totalRating = filteredAgents.reduce(
    (sum, agent) => sum + Number(agent.rating),
    0
  );
  const totalFee = filteredAgents.reduce(
    (sum, agent) => sum + Number(agent.fee),
    0
  );
  const averageRating = (totalRating / filteredAgents.length).toFixed(2);
  const averageFee = (totalFee / filteredAgents.length).toFixed(2);

  res.status(200).json({
    region,
    average_rating: parseFloat(averageRating),
    average_fee: parseFloat(averageFee),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.route("/contact-form").post(function (req, res) {
  res.json({
    name: `${req.body.name}`,
    message: `${req.body.message}`,

    response: `thank you ${req.body.name} for your submission`,
  });
  console.log("Hi again");
});


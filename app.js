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
app.listen(PORT, () => {
  console.log(`Server is running on ${ENV_URL}:${PORT}`);
});
  const info = {
    url: ENV_URL,
    port: PORT
  };
  
  res.send(info);
});


app.get("/hello", (req, res) => {
  res.send("Hello World");
  console.log(`You are using port ${PORT}`);
});

app.get("/residential", (req, res) => elevators.residential(req,res));

app.get("/error", (req, res) => {
  res.status(500).send("Error");
});


app.get("/email-list", (req, res) => {
  console.log(agents.agents)
  const emails = agents.agents.map(agent => agent.email);
    res.send(emails)
});

app.get("/regionavg", (req, res) => {
  const region = req.query.region ? req.query.region.toLowerCase() : null;  

  if (!region) {
    return res.status(400).json({ error: "Region value is required" });
  }

  const filteredAgents = agents.agents.filter(
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


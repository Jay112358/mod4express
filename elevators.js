

// function for residential elevator calc
function residential (req, res) {
  const { apartments, floors, install } = req.body;

  if (!apartments || !floors || !install) {
    return res.status(400).send("Missing required fields");
  }

  // Calculate required elevators
  const banks = Math.ceil(floors / 20);
  const resnumberneeded = Math.ceil(apartments / floors / 6);
  const elevatorsneeded = resnumberneeded * banks;

  let unitprice;
  switch (install.toLowerCase()) {
    case "standard":
      unitprice = 8000;
      break;
    case "premium":
      unitprice = 10000;
      break;
    case "excelium":
      unitprice = 12000;
      break;
    default:
      return res.status(400).send("Invalid installation type");
  }

  let installfee;
  switch (install.toLowerCase()) {
    case "standard":
      installfee = elevatorsneeded * unitprice * 0.1;
      break;
    case "premium":
      installfee = elevatorsneeded * unitprice * 0.15;
      break;
    case "excelium":
      installfee = elevatorsneeded * unitprice * 0.2;
      break;
  }

  const firstmath = elevatorsneeded * unitprice;
  const finalcost = firstmath + installfee;

  function formatCurrency(value) {
    return `$${parseFloat(value).toFixed(2)}`;
  }

  const response = {
    apartments,
    floors,
    install,
    unitprice: formatCurrency(unitprice),
    elevatorsneeded,
    installfee: formatCurrency(installfee),
    finalcost: formatCurrency(finalcost),
  };

  res.json(response);
};

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


module.exports = { residential };
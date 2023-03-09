const { Permit } = require("permitio");

const express = require("express");
const app = express();
const port = 4000;
app.use(express.json());
// allow cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




// This line initializes the SDK and connects your Node.js app
// to the Permit.io PDP container you've set up in the previous step.
const permit = new Permit({
  // in production, you might need to change this url to fit your deployment
  pdp: "http://localhost:7766",
  // your api key
  token: "permit_key_SECRET"
});


// add route that get user resource and action as get parameters and check if user is permitted
app.get("/", async (req, res) => {
  const { user, resource, action } = req.query;
  const permitted = await permit.check(user, action, resource); 
  res.send({permitted});
});

// create async function to check if user is permitted to access resource
const checkIfPermitted = async (user, resourcesAndActions) => {
  let isPermittedList = [];
  const promises = resourcesAndActions.map(async (resourceAndAction, index) => {
  const { resource, action } = resourceAndAction;
  const permitted = await permit.check(user, action, resource);
  console.log(isPermitted, "bulk");
  isPermittedList= [...isPermittedList, {index, permitted}];
  });
  await Promise.all(promises);
  return isPermittedList.sort((a,b) => a.index - b.index).map((item) => item.permitted);
}

// add route that get user and list of resources and actions object as post parameters and check if user is permitted
app.post("/bulk", async (req, res) => {
  const { user, resourcesAndActions } = req.body;
  res.send(await checkIfPermitted(user, resourcesAndActions));
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

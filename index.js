const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const user_id = "karthik_gopuram_22022003";
const email = "karthik.20bcn7008@vitap.ac.in";
const roll_number = "20BCN7008";

app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
  const data = req.body.data || [];
  const is_success = "data" in req.body;
  var alphabets = [];
  var numbers = [];
  var highest_alphabet = null;
  let flag = false;
  for (var i = 0; i < data.length; i++) {
    if (isNaN(data[i])) {
      if(data[i].length > 1){
        flag = true;
      }
      alphabets.push(data[i]);
      if (highest_alphabet === null || data[i] > highest_alphabet) {
        highest_alphabet = data[i];
      }
    } else {
      numbers.push(data[i]);
    }
  }

  const response_data = {
    is_success: is_success,
    user_id: user_id,
    email: email,
    roll_number: roll_number,
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: [highest_alphabet],
  };

  if(!flag) res.json(response_data);
  else res.status(500).json({ message: "data array should only contain single character, never a word" });
});

app.get("/bfhl", (req, res) => {
  if (Object.keys(req.body).length !== 0)
    res.status(500).json({ message: "Input is not allowed" });
  else {
    const operation_code = 1;
    res.status(200).json({ operation_code: operation_code });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

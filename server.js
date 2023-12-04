import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("hello");
});

app.post("/optimize", (req, res) => {
  const { query } = req.body;



  fetch('https://api.edenai.run/v2/text/prompt_optimization', returnOptions(query))
    .then((response) => response.json())
    .then((response) => res.json(response.openai.items))
    .catch((err) => console.error(err));
});

const returnOptions = (input) => {
 

  return {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.KEY}`,
    },
    body: JSON.stringify({
      response_as_dict: true,
      attributes_as_list: false,
      show_original_response: false,
      target_provider: 'openai',
      providers: 'openai',
      fallback_providers: 'openai',
      text: `${input}  return short and concise optimized prompts .`,
    }),
  };
};

app.listen(4000, () => {
  console.log("server running at port 4000 ");
});

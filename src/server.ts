import dotenv from "dotenv";
import cors from "cors";
import express, { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import { createChatCompletion } from "./openAI/completion";
dotenv.config();

const port = process.env.PORT || 3000;
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const app = express();
app.use(express.json());
app.use(cors());

app.post("/prompt", async (req: Request, res: Response) => {
  try {
    const userPrompt = req.body.prompt;
    const completion = await createChatCompletion(openai, userPrompt);
    res.send(completion?.content);
  } catch (error) {
    console.log("error: ", error);
    res.status(400);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

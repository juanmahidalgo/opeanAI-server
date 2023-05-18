import dotenv from "dotenv";
import cors from "cors";
import express, { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import { createChatCompletion } from "./openAI/completion";
import { SDKScrapper } from "./doc-scrapper/sdk-scrapper";

const STATIC_JSON = require("./static.json");
console.log('STATIC_JSON: ', STATIC_JSON);

dotenv.config();

const port = process.env.PORT || 3000;
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const app = express();
app.use(express.json());
app.use(cors());

const main = async () => {
  const sdkDocsScrapper = new SDKScrapper();
  const sdkDocumentation = await sdkDocsScrapper.downloadSDKDocumentation();

  app.post("/prompt", async (req: Request, res: Response) => {
    try {
      const userPrompt = req.body.prompt;
      const completion = await createChatCompletion(
        openai,
        userPrompt,
        sdkDocumentation
      );
      res.send(completion?.content);
    } catch (error: any) {
      // console.log("error: ", error.message);
      res.status(400);
    }
  });

  app.post("/static-prompt", async (req: Request, res: Response) => {
    try {
      const userPrompt = req.body.prompt;
      res.send(STATIC_JSON);
    } catch (error: any) {
      // console.log("error: ", error.message);
      res.status(400);
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

main();

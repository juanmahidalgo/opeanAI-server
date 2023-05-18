import { ChatCompletionRequestMessageRoleEnum, OpenAIApi } from "openai";
import {
  getDocumentationSystemMessage,
  getDocumentationSystemMessages,
  systemProtocolMessage,
} from "./messages";

export const createChatCompletion = async (
  openai: OpenAIApi,
  userPrompt: string,
  sdkDocumentation: string[]
) => {
  const sdkDocs = getDocumentationSystemMessage(sdkDocumentation);
  console.log("sdkDocs: ", sdkDocs);
  const conversation = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: systemProtocolMessage,
    },
    // ...getDocumentationSystemMessages(sdkDocumentation),
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Given a 16x16x16 space, create a column of height 4. The column should be formed by cubes and start on the ground. At height 2 of the column, add a column made out of cylinders in horizontal orientation with length 7 and 90 degres rotated on the Z axis. Do not include any explanations, only provide a RFC8259 compliant JSON response`,
      // content: `Create a list of shapes that put together are a house for the Decentraland scene I'm creating. Use as many shapes as possible so the house looks as realistic as possible. The house must be between 1 and 16 meters. The only hole should be the door.
      // Do not include any explanations, only provide a RFC8259 compliant JSON response`,
    },
  ];
  const convLength = conversation.reduce((acc, curr) => {
    return acc + curr.content.length;
  }, 0);
  console.log("convLenght: ", convLength);
  console.log("Chat completion started...");
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: conversation,
    });
    const message = completion.data.choices[0].message;
    console.log("completion.data.choices: ", completion.data.choices);
    return message;
  } catch (error) {
    console.log("error1: ", error);
  }
};

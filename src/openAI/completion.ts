import { ChatCompletionRequestMessageRoleEnum, OpenAIApi } from "openai";
import { systemProtocolMessage } from "./messages";

export const createChatCompletion = async (
  openai: OpenAIApi,
  userPrompt: string
) => {
  const conversation = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: systemProtocolMessage,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      //   content: ${userPrompt},
      content: `Given a 16x16x16 area. Create a list of shapes that put together are stairs for my player for the Decentraland scene I'm creating.
      Do not include any explanations, only provide a RFC8259 compliant JSON response`,
    },
  ];
  console.log("Chat completion started...");
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: conversation,
  });
  const message = completion.data.choices[0].message;
  console.log("message: ", message);
  return message;
};

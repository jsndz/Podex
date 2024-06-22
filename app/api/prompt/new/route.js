import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { getUserId } from "@utils/getUserId";

export const POST = async (req, res) => {
  const { prompt, tag, userEmail } = await req.json();
  const userId = await getUserId(userEmail);
  try {
    await connectToDB();
    const newPrompt = await Prompt.create({ creator: userId, prompt, tag });
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new prompts", { status: 500 });
  }
};

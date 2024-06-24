import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const { id } = params;
    console.log(id);

    const prompts = await Prompt.find({ creator: id });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch prompts:", error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

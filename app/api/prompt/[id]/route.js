import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
    const { prompt, tag } = await req.json();

    const UpdatedPrompt = await Prompt.findByIdAndUpdate(
      params.id,
      {
        prompt: prompt,
        tag: tag,
      },
      { new: true }
    );
    if (!UpdatedPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(UpdatedPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

    if (!deletedPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(deletedPrompt), { status: 200 });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    return new Response("Failed to delete the prompt", { status: 500 });
  }
};

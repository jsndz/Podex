import Feed from "@components/Feed";

function Home() {
  return (
    <section className="w-full pt-16 flex-center flex-col">
      <h1 className="head_text text-center">
        Podex
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> The Prompt Codex</span>
      </h1>
      <p className="desc text-center">
        Podex is a curated collection of coding prompts for developers of all
        levels, offering challenges across various languages and domains to
        enhance your skills and tackle real-world scenarios.
      </p>

      <Feed />
    </section>
  );
}

export default Home;

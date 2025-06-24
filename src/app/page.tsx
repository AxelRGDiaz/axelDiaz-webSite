import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen flex flex-col justify-center items-center p-8 text-center max-w-4xl mx-auto">
        <h1 className="text-6xl font-extrabold mb-6 leading-tight">
          Hello, I'm <span className="text-primary">Axel Diaz</span>
        </h1>
        <p className="text-xl mb-8 max-w-xl">
          I am a full stack web developer focused on building fast, accessible, and attractive websites using Next.js.
        </p>
        <a href="/projects" className="btn">
          View my projects
        </a>
      </main>
    </>
  );
}

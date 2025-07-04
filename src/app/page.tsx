"use client";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen flex flex-col justify-center items-center p-8 text-center max-w-4xl mx-auto">
        <h1 className="text-6xl font-extrabold mb-6 leading-tight opacity-0 animate-fade-in">
          Hello, {"I'm"} <span className="text-primary">Axel Diaz</span>
        </h1>
        <p className="text-xl mb-8 max-w-xl opacity-0 animate-fade-in animation-delay-200">
          Full Stack developer passionate about creating efficient and modern web applications.
        </p>
        <a
          href="/projects"
          className="btn-minimal"
        >
          View my projects
        </a>
      </main>
    </>
  );
}

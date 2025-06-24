import NavBar from "../components/NavBar";

const projects = [
  {
    title: "Proyecto Uno",
    description: "App moderna con Next.js y Tailwind.",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    repo: "https://github.com/tuusuario/proyecto-uno",
    demo: "https://demo.proyecto-uno.com",
  },
  {
    title: "Proyecto Dos",
    description: "App frontend con React y API REST.",
    tech: ["React", "API REST", "CSS Modules"],
    repo: "https://github.com/tuusuario/proyecto-dos",
  },
];

export default function Projects() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Mis proyectos</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map(({ title, description, tech, repo, demo }) => (
            <article
              key={title}
              className="border rounded-lg p-6 shadow-lg hover:shadow-2xl transition"
            >
              <h2 className="text-2xl font-semibold mb-2">{title}</h2>
              <p className="mb-3 text-gray-700 dark:text-gray-300">{description}</p>
              <p className="mb-3 font-mono text-sm text-primary">
                Tecnologías: {tech.join(", ")}
              </p>
              <div className="flex space-x-4">
                {repo && (
                  <a
                    href={repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Repo
                  </a>
                )}
                {demo && (
                  <a
                    href={demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}

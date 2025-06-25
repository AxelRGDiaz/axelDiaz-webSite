import NavBar from "../components/NavBar";

const projects = [
  {
    title: "Environmental Monitoring",
    description: "Environmental monitoring app with IoT and MongoDB",
    tech: ["Node", "Express", "MongoDB"],
    repo: "https://github.com/AxelRGDiaz/Monitoreo-Ambiental-con-IoT-y-MongoDB",
  },
  {
    title: "Portfolio",
    description: "Frontend app with Next.js",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    repo: "https://github.com/AxelRGDiaz/axelDiaz-webSite",
    demo: "https://axel-diaz.com"
  },
];

export default function Projects() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center opacity-0 animate-fade-in">
          My Projects
        </h1>
        <div className="grid md:grid-cols-2 gap-8 opacity-0 animate-fade-in animation-delay-200">
          {projects.map(({ title, description, tech, repo, demo }) => (
            <article
              key={title}
              className="border rounded-lg p-6 shadow-lg hover:shadow-2xl transition"
            >
              <h2 className="text-2xl font-semibold mb-2">{title}</h2>
              <p className="mb-3 text-gray-700 dark:text-gray-300">{description}</p>
              <p className="mb-3 font-mono text-sm text-primary">
                Technologies: {tech.join(", ")}
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

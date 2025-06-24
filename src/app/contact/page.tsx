import NavBar from "../components/NavBar";

export default function Contact() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Contacto</h1>
        <p className="mb-4 text-center text-lg">
          ¿Quieres contactarme? Aquí mis datos:
        </p>
        <ul className="space-y-4 text-center text-lg">
          <li>
            📧 Email:{" "}
            <a
              href="mailto:tuemail@example.com"
              className="text-primary hover:text-secondary"
            >
              tuemail@example.com
            </a>
          </li>
          <li>
            💼 LinkedIn:{" "}
            <a
              href="https://linkedin.com/in/tuusuario"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary"
            >
              linkedin.com/in/tuusuario
            </a>
          </li>
          <li>
            🐙 GitHub:{" "}
            <a
              href="https://github.com/tuusuario"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary"
            >
              github.com/tuusuario
            </a>
          </li>
        </ul>
      </main>
    </>
  );
}

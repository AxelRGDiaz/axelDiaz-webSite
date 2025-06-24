import NavBar from "../components/NavBar";
import Image from "next/image";

export default function About() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Sobre mí</h1>
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/tu-foto.jpg"
            alt="Foto de [Tu Nombre]"
            width={160}
            height={160}
            className="rounded-full shadow-lg"
          />
        </div>
        <p className="mb-4 text-lg leading-relaxed">
          Soy un desarrollador web con experiencia en Next.js, React y Tailwind CSS. Me apasiona construir aplicaciones que sean rápidas, accesibles y con un diseño limpio.
        </p>
        <p className="mb-4 text-lg leading-relaxed">
          Mi enfoque es crear experiencias que impacten y sean fáciles de usar para los usuarios.
        </p>
      </main>
    </>
  );
}

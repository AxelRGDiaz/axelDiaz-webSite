import NavBar from "../components/NavBar";
import Image from "next/image";

export default function About() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen max-w-3xl mx-auto p-8">
        <div className="flex flex-col items-center mb-8 opacity-0 animate-fade-in animation-delay-200">
          <div className="w-40 h-40 relative rounded-full overflow-hidden shadow-lg">
            <Image
              src="/images/tu-foto.jpg"
              alt="Photo of Axel Diaz"
              fill
              className="object-cover scale-120"
            />
          </div>
        </div>
        <p className="mb-4 text-lg leading-relaxed opacity-0 animate-fade-in animation-delay-600">
          I am a Full Stack Developer with experience building robust and efficient applications using technologies such as Ruby on Rails, Vue.js, JavaScript, MySQL, MongoDB, HTML, and CSS. I also have strong skills working with Linux environments and terminal tools.
        </p>
        <p className="mb-4 text-lg leading-relaxed opacity-0 animate-fade-in animation-delay-800">
          I specialize in developing complete web solutions, from scalable backend systems to modern, intuitive user interfaces, always focusing on performance, security, and user experience.
        </p>
        <p className="mb-4 text-lg leading-relaxed opacity-0 animate-fade-in animation-delay-1200">
          I enjoy solving complex problems, optimizing processes, and working on projects that create real impact. {"I'm"} always looking to learn and stay up to date with the latest technologies and best practices in web development.
        </p>
      </main>
    </>
  );
}

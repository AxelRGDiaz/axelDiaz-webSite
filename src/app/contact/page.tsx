import NavBar from "../components/NavBar";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowTopRightOnSquareIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

const contactMethods = [
  {
    icon: "/icons/discord.svg",
    name: "Discord",
    url: "https://discord.com/",
  },
  {
    icon: EnvelopeIcon,
    name: "Email",
    url: "mailto:info.offer@axel-diaz.com",
  },
  {
    icon: "/icons/github.svg",
    name: "GitHub",
    url: "https://github.com/AxelRGDiaz",
  },
  {
    icon: "/icons/linkedin.svg",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/axel-diaz24/",
  },
  {
    icon: PhoneIcon,
    name: "Telephone",
    url: "tel:+523125940609",
  },
  {
    icon: "/icons/twitter.svg",
    name: "Twitter",
    url: "https://x.com/AxelRGDiaz",
  },
];

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-center opacity-0 animate-fade-in">
          Contact Me
        </h1>
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-0 animate-fade-in animation-delay-400">
          {contactMethods
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((contactMethod, index) => (
              <li key={index}>
                <Link
                  href={contactMethod.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center border border-gray-400 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  {typeof contactMethod.icon === "string" ? (
                    <Image
                      src={contactMethod.icon}
                      alt={contactMethod.name}
                      width={24}
                      height={24}
                      className="flex-shrink-0"
                    />
                  ) : (
                    <contactMethod.icon className="h-6 w-6 flex-shrink-0" />
                  )}
                  <span className="ml-3 flex-1">{contactMethod.name}</span>
                  <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </Link>
              </li>
            ))}
        </ul>
      </main>
    </>
  );
}

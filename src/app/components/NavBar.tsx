"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DarkModeToggle from "./DarkModeToggle";

export default function NavBar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About me" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar-blur sticky top-0 z-50 border-b border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="flex space-x-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-lg font-medium transition ${
  pathname === href ? "text-primary border-b-2 border-primary pb-1" : "hover:text-secondary"}
              `}
            >
              {label}
            </Link>
          ))}
        </div>
        <DarkModeToggle />
      </div>
    </nav>
  );
}

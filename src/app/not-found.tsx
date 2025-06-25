import Link from "next/link";
import NavBar from "./components/NavBar";

export default function NotFound() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen flex flex-col justify-center items-center p-8 text-center bg-[var(--background)] text-[var(--foreground)] transition-colors">
        <div className="w-40 h-40 mb-6">
          <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
          >
            <circle cx="75" cy="75" r="70" strokeDasharray="440" strokeDashoffset="0">
              <animate attributeName="stroke-dashoffset" from="440" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
            <line x1="45" y1="45" x2="105" y2="105" strokeWidth="8" strokeLinecap="round">
              <animate attributeName="stroke-opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
            </line>
            <line x1="105" y1="45" x2="45" y2="105" strokeWidth="8" strokeLinecap="round">
              <animate attributeName="stroke-opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
            </line>
          </svg>
        </div>

        <h1 className="text-6xl font-extrabold mb-4 text-primary">404</h1>
        <p className="text-xl mb-6">Oops! The page {"you're"} looking for {"doesn't"} exist.</p>

        <Link href="/" className="btn-minimal">
          Go back Home
        </Link>
      </main>
    </>
  );
}


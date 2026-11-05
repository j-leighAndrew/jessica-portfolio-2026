import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm tracking-widest text-gold">404</p>
      <h1 className="mt-2 font-display text-5xl text-white">Page not found</h1>
      <p className="mt-4 max-w-md text-slate-400">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-gold px-6 py-3 font-medium text-navy-950 transition-colors hover:bg-gold-light"
      >
        Back to home
      </Link>
    </section>
  );
}
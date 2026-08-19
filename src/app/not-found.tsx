import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mesh-bg flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs tracking-[0.28em] text-cyan uppercase">404</p>
      <h1 className="font-display mt-3 text-4xl text-foreground">This page does not exist.</h1>
      <p className="mt-3 max-w-md text-muted">
        The route you requested is not part of this portfolio. Head back to the main page to keep exploring.
      </p>
      <Link href="/" className="mt-8 rounded-full bg-cyan px-5 py-3 text-sm font-medium text-slate-950">
        Back home
      </Link>
    </div>
  );
}

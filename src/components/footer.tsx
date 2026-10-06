import { profile } from "@/data/resume";

export function Footer({ layout }: { layout: "desktop" | "mobile" }) {
  const other = layout === "mobile" ? "desktop" : "mobile";

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-6 py-6 font-mono text-xs text-muted sm:flex-row sm:justify-between">
        <span>
          © {new Date().getFullYear()} {profile.name} · built with Next.js & Tailwind CSS
        </span>
        <a href={`/?view=${other}`} className="underline-offset-4 hover:text-accent hover:underline">
          view {other} site
        </a>
      </div>
    </footer>
  );
}

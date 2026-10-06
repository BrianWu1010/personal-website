import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon, DownloadIcon } from "@/components/icons";
import { profile } from "@/data/resume";

export const metadata: Metadata = {
  title: `Resume — ${profile.name}`,
};

export default function ResumePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-5">
          <Link href="/" className="font-mono text-sm text-muted hover:text-foreground">
            ← <span className="text-accent">~/</span>
            {profile.handle.toLowerCase()}
          </Link>
          <div className="flex items-center gap-2 font-mono text-sm">
            <a
              href={profile.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-md border border-border px-2.5 py-1 hover:border-accent hover:text-accent sm:inline-flex"
            >
              open PDF <ArrowUpRightIcon />
            </a>
            <a
              href={profile.resumePdf}
              download
              className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-2.5 py-1 text-background hover:opacity-85"
            >
              <DownloadIcon className="size-3.5" />
              download
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 py-5">
        <iframe
          src={`${profile.resumePdf}#view=FitH&navpanes=0`}
          title={`${profile.name} — resume`}
          className="min-h-[80dvh] w-full flex-1 rounded-lg border border-border bg-surface"
        />
        <p className="mt-3 text-center font-mono text-xs text-muted">
          PDF not showing?{" "}
          <a href={profile.resumePdf} target="_blank" rel="noreferrer" className="text-accent hover:underline">
            open it directly
          </a>
        </p>
      </main>
    </div>
  );
}

import Experience from "@/components/Experience";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/Button";
import { FileDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Drawn as SVG because flag emojis don't render on Windows (they show as "NL")
function DutchFlag() {
  return (
    <svg viewBox="0 0 3 3" className="size-full">
      <rect width="3" height="1" fill="#AE1C28" />
      <rect y="1" width="3" height="1" fill="#FFFFFF" />
      <rect y="2" width="3" height="1" fill="#21468B" />
    </svg>
  );
}

export default async function Home() {
  return (
    <article className="mt-8 flex flex-col gap-16 pb-16">
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <div className="relative">
          <Image
            className="rounded-lg"
            src="/ivan.jpg"
            alt="Photo of Ivan"
            width={175}
            height={175}
            priority
          />
          <span
            role="img"
            aria-label="Based in The Netherlands"
            title="Based in The Netherlands"
            className="absolute -bottom-2 -right-2 size-8 overflow-hidden rounded-full shadow-md ring-2 ring-background"
          >
            <DutchFlag />
          </span>
        </div>
        <div className="flex max-w-[320px] flex-col sm:max-w-full">
          <h1 className="title text-balance text-4xl sm:text-5xl">
            hi ivan here. 👋
          </h1>

          <p className="mt-2 text-balance text-sm font-medium sm:text-base">
            Senior Software Engineer based in The Netherlands
          </p>

          <p className="mt-4 max-w-sm text-balance text-sm sm:text-base">
            Backend engineer who loves diving into all aspects of software
            development. From APIs to infrastructure, I enjoy building robust
            systems end-to-end.
          </p>

          <section className="mt-6 flex flex-wrap items-center gap-4">
            <Link href="/resume.pdf" target="_blank">
              <Button variant="outline">
                <span className="font-semibold">Resume</span>
                <FileDown className="ml-2 size-5" />
              </Button>
            </Link>
            <Socials />
          </section>
        </div>
      </section>

      <Experience />
    </article>
  );
}

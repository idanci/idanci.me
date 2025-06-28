import Experience from "@/components/Experience";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/Button";
import {
  ArrowDown,
  ArrowDownRight,
  FileDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const IVAN_BIRTH_YEAR = 1989;
const IVAN_BIRTH_MONTH = 11; // December (0-indexed)

export default async function Home() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const age = currentMonth >= IVAN_BIRTH_MONTH ? currentYear - IVAN_BIRTH_YEAR : currentYear - IVAN_BIRTH_YEAR - 1;

  return (
    <article className="mt-8 flex flex-col gap-16 pb-16">
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <Image
          className="rounded-lg"
          src="/ivan.jpg"
          alt="Photo of Ivan"
          width={175}
          height={175}
          priority
        />
        <div className="flex max-w-[320px] flex-col sm:max-w-full">
          <h1 className="title text-balance text-4xl sm:text-5xl">
            hi ivan here. 👋
          </h1>

          <p className="mt-2 whitespace-nowrap text-sm font-medium sm:text-base">
            {age}yo Software Engineer from The Netherlands 🇳🇱
          </p>

          <p className="mt-4 max-w-sm text-balance text-sm sm:text-base">
            Backend engineer who loves diving into all aspects of software development.
            From APIs to infrastructure, I enjoy building robust systems end-to-end.
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

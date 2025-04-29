import { Button } from "@/components/ui/button";
import { Hero, HeroContent, HeroImage } from "@/components/ui/hero";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

const EducationPage = () => {
  return (
    <>
      <Hero>
        <HeroContent>
          <h2 className="text-6xl font-medium text-white">Education</h2>
        </HeroContent>
        <HeroImage
          className="brightness-50"
          src="/assets/img/electrum-lab.png"
          alt=""
        />
      </Hero>
      <section className="max-w-prose mx-auto [&>p]:text-muted-foreground">
        <p className="mb-12">
          The programs at KTH Kista include a Master of Science in Information
          Technology (civilingenjör), Bachelor of Science programs in Computer
          Science and Electronics and Computer Science (högskoleingenjör), an
          international Bachelor of Science in Information and Communication
          Technology, and several mapped master&apos;s programs.
        </p>
        <h3 className="text-2xl font-medium mb-2">
          Master of Science in Information Technology
        </h3>
        <p className="mb-3">
          The Master of Science in Information Technology Engineering (CINTE) is
          a five-year (civilingenjör) program consisting of 300 Swedish hp
          credits.
        </p>
        <p className="mb-3">
          It starts with a three-year Bachelor&apos;s program in Information
          Technology (180 Swedish hp credits) with mandatory core courses and
          some free-choice courses, followed by a two-year Master&apos;s program
          (120 Swedish hp credits) within one of the eligible Master&apos;s
          programs mapped to the Master of Science in Information Technology
          Engineering programme.
        </p>
        <p className="mb-3">
          The program is designed for those who want to work with the future
          challenges in IT, both in international companies and startup
          businesses.
        </p>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/education/programmes?p=CINTE">Read more</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link
              href="https://www.kth.se/student/kurser/program/CINTE?l=en"
              target="_blank"
            >
              kth.se <ExternalLinkIcon />
            </Link>
          </Button>
        </div>
        <h3 className="text-2xl font-medium mb-2 mt-12">
          Bachelor of Science in Computer Science
        </h3>
        <p className="mb-3">
          The Bachelor of Science in Computer Engineering (TIDAB) is a
          three-year (högskoleingenjör) program consisting of 180 Swedish hp
          credits.
        </p>
        <p className="mb-3">
          It starts with mandatory core courses in the first year, followed by a
          mix of mandatory and free-choice courses during the last two years.
        </p>
        <p className="mb-3">
          The program is designed for those who want to develop future connected
          products and software.
        </p>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/education/programmes?p=TIDAB">Read more</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link
              href="https://www.kth.se/student/kurser/program/TIDAB?l=en"
              target="_blank"
            >
              kth.se <ExternalLinkIcon />
            </Link>
          </Button>
        </div>
        <h3 className="text-2xl font-medium mb-2 mt-12">
          Bachelor of Science in Information and Communication Technology
        </h3>
        <p className="mb-3">
          The Bachelor of Science in Information and Nanotechnology (TCOMK) is a
          three-year bachelor&apos;s program consisting of 180 Swedish hp
          credits, entirely taught in English, and equivalent to an
          international Bachelor&apos;s degree.
        </p>
        <p className="mb-3">
          It starts with mandatory core courses in the first year, followed by a
          mix of mandatory and free-choice courses during the last two years
        </p>
        <p className="mb-3">
          As the program is on an international track in English, students come
          from various parts of the world.
        </p>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/education/programmes?p=TCOMK">Read more</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link
              href="https://www.kth.se/student/kurser/program/TCOMK?l=en"
              target="_blank"
            >
              kth.se <ExternalLinkIcon />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default EducationPage;

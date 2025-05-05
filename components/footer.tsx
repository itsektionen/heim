import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mb-24 sm:mb-0 h-50">
      <div className="container mx-auto h-full p-6 sm:border-x">
        <div className="mb-8">
          <ul className="text-sm space-y-2">
            <li>
              <Link
                className="hover:underline underline-offset-4"
                href="https://www.facebook.com/itsektionenkth"
              >
                Facebook
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline underline-offset-4"
                href="https://www.instagram.com/itsektionenkth/"
              >
                Instagram
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline underline-offset-4"
                href="https://www.linkedin.com/company/itsektionen/"
              >
                LinkedIn
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline underline-offset-4"
                href="https://www.github.com/itsektionen"
              >
                GitHub
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
          <p className="text-muted-foreground text-xs">
            {`Copyright © ${currentYear} Sektionen för Informationsteknik`}
          </p>
          <p className="text-muted-foreground text-xs text-right">
            The source code for this site is available on{" "}
            <Link
              className="underline sm:no-underline hover:underline underline-offset-4"
              href="https://www.github.com/itsektionen"
            >
              GitHub
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };

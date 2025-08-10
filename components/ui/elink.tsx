import Link from "next/link";

export default function ELink({
  href,
  children,
  external = false,
  primary = true,
}: {
  href?: string;
  children: React.ReactNode;
  external?: boolean;
  primary?: boolean;
}) {
  return (
    <Link
      className={
        primary
          ? "text-primary"
          : undefined + " hover:underline underline-offset-4"
      }
      href={href ?? (typeof children === "string" ? children : "#")}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}>
      {children}
    </Link>
  );
}

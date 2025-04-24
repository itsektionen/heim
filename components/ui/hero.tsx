import { cn } from "@/lib/utils";
import Image from "next/image";

export const Hero = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "-ml-6 -mr-6 -mt-6 mb-6 relative h-[365px] border-b",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const HeroContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center h-full justify-center flex-col p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const HeroImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <Image
      className={cn(
        "object-cover h-[365px] absolute left-0 right-0 top-0 bottom-0 -z-1 bg-muted",
        className,
      )}
      src={src}
      alt={alt}
      width={1920}
      height={1080}
    />
  );
};

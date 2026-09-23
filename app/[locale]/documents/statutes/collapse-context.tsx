"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type CollapseState = {
  isOpen: (slug: string) => boolean;
  setOpen: (slug: string, open: boolean) => void;
  reveal: (slug: string) => void;
  navigate: (hash: string) => void;
};

const CollapseContext = createContext<CollapseState | null>(null);

export const CollapseProvider = ({
  defaultOpen = [],
  children,
}: {
  defaultOpen?: string[];
  children: React.ReactNode;
}) => {
  const [openSlugs, setOpenSlugs] = useState<Set<string>>(
    () => new Set(defaultOpen),
  );

  const isOpen = useCallback(
    (slug: string) => openSlugs.has(slug),
    [openSlugs],
  );

  const setOpen = useCallback((slug: string, open: boolean) => {
    setOpenSlugs((prev) => {
      const next = new Set(prev);
      if (open) next.add(slug);
      else next.delete(slug);
      return next;
    });
  }, []);

  const navigate = useCallback((hash: string) => {
    window.location.hash = hash;
    setTimeout(() => {
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }, []);

  const reveal = useCallback(
    (slug: string) => {
      setOpen(slug, true);
      navigate(`#${slug}`);
    },
    [setOpen, navigate],
  );

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const slug = hash.split("--")[0];
    setOpen(slug, true);

    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ block: "start" });
    }, 0);
  }, []);

  return (
    <CollapseContext.Provider value={{ isOpen, setOpen, reveal, navigate }}>
      {children}
    </CollapseContext.Provider>
  );
};

export const useCollapse = () => {
  const context = useContext(CollapseContext);
  if (!context)
    throw new Error("useCollapse must be used inside a CollapseProvider");
  return context;
};

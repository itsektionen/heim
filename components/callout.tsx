const Callout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="-mx-4 bg-muted p-4  rounded-lg mb-4 border">{children}</div>
  );
};

export { Callout };

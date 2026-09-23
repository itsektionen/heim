import { cn } from "@/lib/utils";

function Collapsible({ ...props }: React.ComponentProps<"details">) {
  return <details data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  className,
  ...props
}: React.ComponentProps<"summary">) {
  return (
    <summary
      data-slot="collapsible-trigger"
      className={cn(
        "flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function CollapsibleContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="collapsible-content" className={cn(className)} {...props} />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

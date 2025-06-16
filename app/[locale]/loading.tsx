import { Loader2Icon } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="min-h-[calc(100vh-3rem-1px)] sm:min-h-[calc(100vh-4rem-12.5rem-1px)] flex items-center justify-center -mb-42 -mt-6">
      <Loader2Icon className="animate-spin text-primary size-8 shrink-0" />
    </div>
  );
};

export default LoadingPage;

import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn("h-11 w-full min-w-0 rounded-xl border border-border bg-white px-3.5 text-sm text-ink outline-none placeholder:text-muted focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    />
  );
}

export { Input };

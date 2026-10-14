"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;
const SheetTitle = Dialog.Title;
const SheetDescription = Dialog.Description;

function SheetContent({ children, className, side = "right", ...props }: React.ComponentProps<typeof Dialog.Content> & { side?: "right" | "left" }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[90] bg-[#101a35]/45 backdrop-blur-[2px] data-[state=open]:animate-[fade-in_.18s_ease-out]" />
      <Dialog.Content
        className={cn(
          "fixed inset-y-0 z-[100] flex w-[min(440px,100%)] flex-col bg-white shadow-2xl outline-none",
          side === "right" ? "right-0" : "left-0",
          className,
        )}
        {...props}
      >
        {children}
        <Dialog.Close aria-label="Close panel" className="absolute right-5 top-5 rounded-lg p-2 text-muted hover:bg-slate-100 hover:text-ink focus-visible:outline-2 focus-visible:outline-primary">
          <X size={19} />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetDescription };

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = CollapsiblePrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Root
    ref={ref}
    className={cn("border-bunnings-neutral-medium-gray border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    className={cn(
      "font-bunnings-heading text-bunnings-xl text-bunnings-primary-green flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      "relative pl-4",
      // Red accent bar on the left
      "before:bg-bunnings-primary-red before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:content-['']",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
  </CollapsiblePrimitive.Trigger>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className="text-bunnings-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all"
    {...props}
  >
    <div className={cn("pt-0 pb-4 pl-4", className)}>{children}</div>
  </CollapsiblePrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

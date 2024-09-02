import React from "react";
import { cn } from "../@/lib/utils";

const HeaderTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<"h1">
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn("text-xl font-semibold text-gray-900 sm:text-2xl", className)}
    {...props}
  />
))
HeaderTitle.displayName = "HeaderTitle"

export default HeaderTitle;

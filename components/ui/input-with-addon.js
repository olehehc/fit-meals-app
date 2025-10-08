import { cn } from "@/lib/utils";
import { NumericInput } from "./numeric-input";

function InputWithAddon({ addon, className, ...props }) {
  return (
    <div className={cn("relative w-24 min-w-0", className)}>
      <NumericInput {...props} className={cn("pr-10 h-8", props.className)} />
      <span className="absolute inset-y-0 right-2 flex items-center text-sm text-muted-foreground pointer-events-none">
        {addon}
      </span>
    </div>
  );
}

export { InputWithAddon };

import * as React from "react";
import { cn } from "@/lib/utils";

function NumericInput({
  className,
  type = "text",
  value,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  ...props
}) {
  const valueStr = value == null ? "" : String(value);

  React.useEffect(() => {
    console.log("[Input] prop value changed", { value: valueStr });
  }, [valueStr]);

  const handleKeyDown = (e) => {
    console.log("[Input] onKeyDown", {
      key: e.key,
      value: valueStr,
      selectionStart: e.target?.selectionStart,
      selectionEnd: e.target?.selectionEnd,
    });

    if (type === "number" && /^[0-9]$/.test(e.key) && valueStr === "0") {
      e.preventDefault();
      console.log("[Input] replace 0 with", e.key);
      if (onChange) onChange({ target: { value: e.key } });
      return;
    }

    if (onKeyDown) onKeyDown(e);
  };

  const handleChange = (e) => {
    console.log("[Input] onChange raw", { raw: e.target.value });
    if (onChange) onChange(e);
  };

  const handleFocus = (e) => {
    console.log("[Input] onFocus", { value: valueStr });
    if (e.target.value === "0") e.target.select();
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    console.log("[Input] onBlur", { value: e.target.value });
    if (onBlur) onBlur(e);
  };

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
}

export { NumericInput };

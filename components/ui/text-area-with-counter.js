import { useState } from "react";

import { Textarea } from "./textarea";

export default function TextAreaWithCounter({ children, state, maxChars }) {
  const [value, setValue] = useState(state.data?.instructions || "");

  return (
    <>
      <Textarea
        id="instructions"
        name="instructions"
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, maxChars))}
        className={`${state.errors?.instructions ? "border-destructive" : ""}`}
      />
      <div className="flex justify-between items-center mt-1">
        <div className="flex-1">{children}</div>
        <p
          className={`text-xs ${
            state.errors?.instructions
              ? "text-destructive"
              : "text-muted-foreground"
          }`}
        >
          {value.length}/{maxChars}
        </p>
      </div>
    </>
  );
}

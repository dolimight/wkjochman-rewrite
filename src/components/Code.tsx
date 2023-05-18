import { FC, useEffect, useRef, useState } from "react";

type CodeProps = {
  length: number;
  placeholder?: string;
  onCompleted: (code: string) => any;
  loading?: boolean;
};

const Code: FC<CodeProps> = ({ length, placeholder, onCompleted, loading }) => {
  const [code, setCode] = useState(placeholder ?? "");
  const inputs = new Array(length).fill(0);
  const itemsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current?.slice(0, inputs.length);
  }, [inputs]);

  useEffect(() => {
    if (code.length === length) {
      onCompleted(code);
    }
  }, [code]);

  useEffect(() => {
    if (placeholder === undefined) return;
    setCode(placeholder ?? "");
    itemsRef.current[0]?.focus();
  }, [placeholder]);

  return (
    <div>
      {inputs.map((_, i) => (
        <input
          onPaste={(e) => {
            const pasted = e.clipboardData.getData("text");
            if (pasted.length === length) {
              setCode(pasted);
            }
          }}
          disabled={loading}
          ref={(el) => (el ? (itemsRef.current[i] = el) : null)}
          className="m-2 h-10 w-10 rounded-md border-2 border-gray-300 text-center text-lg font-semibold caret-transparent focus:outline-primary md:h-16 md:w-14"
          key={i}
          type="number"
          maxLength={1}
          value={code[i] ?? ""}
          onKeyDown={(e) => {
            if (code[i]?.length === 1 && e.key !== "Backspace") {
              itemsRef.current[i + 1]?.focus();
            } else if (e.key === "Backspace") {
              itemsRef.current[i - 1]?.focus();
            }
          }}
          onChange={(e) => {
            const value = e.target.value;
            setCode((prev) => {
              const newCode = prev.split("");
              newCode[i] = value;
              return newCode.join("");
            });
          }}
        />
      ))}
    </div>
  );
};

export default Code;

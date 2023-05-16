import { useState } from "react";

const useCode = () => {
  const [code, setCode] = useState<string | null>(
    sessionStorage.getItem("code")
  );

  const handleCodeChange = (code: string) => {
    sessionStorage.setItem("code", code);
    setCode(code);
  };

  return { code, handleCodeChange };
};

export default useCode;

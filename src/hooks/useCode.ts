import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const useCode = () => {
  const [searchParams, _] = useSearchParams();
  const [code, setCode] = useState<string | null>(
    searchParams ? searchParams.get("code") : sessionStorage.getItem("code")
  );

  const handleCodeChange = (code: string) => {
    sessionStorage.setItem("code", code);
    setCode(code);
  };

  return { code, handleCodeChange };
};

export default useCode;

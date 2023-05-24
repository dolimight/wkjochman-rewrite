import useFirebase from "./useFirebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import useRespondant, { Respondant } from "./useRespondant";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

enum Age {
  Adult,
  Kid,
}

enum ComingTo {
  Ceremony,
  Reception,
  All,
  Unknown,
  None,
}

type Person = {
  name: string;
  age: Age;
};

const useRSVP = (code: string | null, resetCode: () => any) => {
  const navigate = useNavigate();
  const { database } = useFirebase();
  const respondantHook = useRespondant();
  const rsvps = collection(database, "rsvps");
  const [respondant, setRespondant] = useState<Respondant>();
  const [loading, setLoading] = useState(false);

  const addRSVP = async (data: Respondant) => {
    if (!code) return;
    await setDoc(doc(rsvps, String(code)), respondantHook.data(data));
  };

  const updateRSVP = async (
    data: Respondant,
    setIsExploding: (isExploding: boolean) => void
  ) => {
    try {
      await addRSVP(data);
      setIsExploding(true);
      toast.success("Successfully submitted!");
      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (e) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  useEffect(() => {
    const getRSVP = async (code: string) => {
      setLoading(true);
      const document = await getDoc(doc(rsvps, code.toString()));
      if (document.exists()) {
        setRespondant(document.data() as Respondant);
      } else {
        toast.error("Invalid code");
        resetCode();
      }
      setLoading(false);
    };

    if (!respondant && code) getRSVP(code);
  }, [code, rsvps, respondant]);

  return {
    respondant,
    addRSVP,
    updateRSVP,
    loading,
  };
};

export default useRSVP;
export { ComingTo, Age };
export type { Person };

import useFirebase from "./useFirebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useRespondant, { Respondant } from "./useRespondant";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

enum Age {
  Adult,
  Kid,
}

enum ComingTo {
  Ceremony,
  Reception,
  All,
  None,
}

type Person = {
  name: string;
  age: Age;
};

const useRSVP = (code: string | null) => {
  const { database, storage } = useFirebase();
  const respondantHook = useRespondant();
  const rsvps = collection(database, "rsvps");
  const [respondant, setRespondant] = useState<Respondant>();
  const [weddingPhoto, setWeddingPhoto] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { generateFamilyName } = useRespondant();

  const uploadImage = async (data: Respondant, file: File) => {
    await uploadBytes(
      ref(storage, `/OtherWedding/${generateFamilyName(data)}.jpg`),
      file
    );
  };

  const addRSVP = async (data: Respondant) => {
    if (!code) return;
    await setDoc(doc(rsvps, String(code)), respondantHook.data(data));
  };

  useEffect(() => {
    const getImage = async (data: Respondant) => {
      const url = await getDownloadURL(
        ref(storage, `/OtherWedding/${generateFamilyName(data)}.jpg`)
      );
      if (url) setWeddingPhoto(url);
    };

    if (respondant && !weddingPhoto) getImage(respondant);
  }, [respondant, weddingPhoto]);

  const updateRSVP = async (
    data: Respondant,
    setIsExploding: (isExploding: boolean) => void,
    file?: File | null
  ) => {
    try {
      if (file) {
        await uploadImage(data, file);
      }
      await addRSVP(data);
      setIsExploding(true);
      toast.success("Successfully submitted!");
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
      }
      setLoading(false);
    };

    if (!respondant && code) getRSVP(code);
  }, [code, rsvps, respondant]);

  return {
    respondant,
    uploadImage,
    addRSVP,
    weddingPhoto,
    updateRSVP,
    loading,
  };
};

export default useRSVP;
export { ComingTo, Age };
export type { Person };

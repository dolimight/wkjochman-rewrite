import { doc, setDoc } from "firebase/firestore";
import useFirebase from "./useFirebase";
import { Respondant } from "./useRespondant";

type MassloadRSVP = {
  respondant: Respondant;
  code: string;
};

const useMassload = () => {
  const { database } = useFirebase();

  const addRSVP = async (rsvp: MassloadRSVP) => {
    await setDoc(doc(database, "rsvps", String(rsvp.code)), rsvp.respondant);
  };

  return { addRSVP };
};

export default useMassload;

export type { MassloadRSVP };

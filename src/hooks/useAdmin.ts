import { useEffect, useMemo, useState } from "react";
import useFirebase from "./useFirebase";
import { Respondant } from "./useRespondant";
import { collection, getDocs } from "firebase/firestore";
import { ComingTo } from "./useRSVP";

type RSVPDetails = {
  coming: Respondant[];
  notComing: Respondant[];
  comingToCeremonyOnly: Respondant[];
  comingToReceptionOnly: Respondant[];
};

const useAdmin = () => {
  const { database } = useFirebase();
  const [rsvps, setRsvps] = useState<Respondant[]>([]);

  useEffect(() => {
    if (rsvps.length) return;

    const getRsvps = async () => {
      const querySnapshot = await getDocs(collection(database, "rsvps"));
      setRsvps(querySnapshot.docs.map((doc) => doc.data() as Respondant));
    };

    getRsvps();
  }, [database, rsvps]);

  const coming = useMemo(() => {
    return rsvps.filter((rsvp) => rsvp.comingTo !== ComingTo.None);
  }, [rsvps]);

  const notComing = useMemo(() => {
    return rsvps.filter((rsvp) => rsvp.comingTo === ComingTo.None);
  }, [rsvps]);

  const comingToCeremonyOnly = useMemo(() => {
    return coming.filter((rsvp) => rsvp.comingTo === ComingTo.Ceremony);
  }, [coming]);

  const comingToReceptionOnly = useMemo(() => {
    return coming.filter((rsvp) => rsvp.comingTo === ComingTo.Reception);
  }, [coming]);

  return {
    rsvps,
    rsvpDetails: {
      coming,
      notComing,
      comingToCeremonyOnly,
      comingToReceptionOnly,
    } satisfies RSVPDetails,
  };
};

export default useAdmin;

export type { RSVPDetails };

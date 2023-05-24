import { useEffect, useMemo, useState } from "react";
import useFirebase from "./useFirebase";
import { Respondant } from "./useRespondant";
import { collection, getDocs } from "firebase/firestore";
import { ComingTo } from "./useRSVP";

type RSVP = {
  respondant: Respondant;
  code: string;
};

type RSVPDetails = {
  coming: RSVP[];
  notComing: RSVP[];
  comingToCeremonyOnly: RSVP[];
  comingToReceptionOnly: RSVP[];
  hasNotResponded: RSVP[];
};

const useAdmin = () => {
  const { database } = useFirebase();
  const [rsvps, setRsvps] = useState<RSVP[]>([]);

  useEffect(() => {
    if (rsvps.length) return;

    const getRsvps = async () => {
      const querySnapshot = await getDocs(collection(database, "rsvps"));
      setRsvps(
        querySnapshot.docs.map((doc) => {
          return { respondant: doc.data() as Respondant, code: doc.id };
        })
      );
    };

    getRsvps();
  }, [database, rsvps]);

  const coming = useMemo(() => {
    return rsvps.filter(
      (rsvp) =>
        rsvp.respondant.comingTo !== ComingTo.None &&
        rsvp.respondant.comingTo !== ComingTo.Unknown
    );
  }, [rsvps]);

  const notComing = useMemo(() => {
    return rsvps.filter((rsvp) => rsvp.respondant.comingTo === ComingTo.None);
  }, [rsvps]);

  const comingToCeremonyOnly = useMemo(() => {
    return coming.filter(
      (rsvp) => rsvp.respondant.comingTo === ComingTo.Ceremony
    );
  }, [coming]);

  const comingToReceptionOnly = useMemo(() => {
    return coming.filter(
      (rsvp) => rsvp.respondant.comingTo === ComingTo.Reception
    );
  }, [coming]);

  const hasNotResponded = useMemo(() => {
    return rsvps.filter(
      (rsvp) => rsvp.respondant.comingTo === ComingTo.Unknown
    );
  }, [coming]);

  return {
    rsvps,
    rsvpDetails: {
      coming,
      notComing,
      comingToCeremonyOnly,
      comingToReceptionOnly,
      hasNotResponded,
    } satisfies RSVPDetails,
  };
};

export default useAdmin;

export type { RSVPDetails, RSVP };

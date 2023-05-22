import { FC } from "react";
import useAdmin, { RSVP } from "../hooks/useAdmin";
import AdminTab from "../components/AdminTab";

export const getPeople = (rsvp: RSVP) => {
  const ret = [...rsvp.respondant.names];
  if (rsvp.respondant.plusOne) ret.push(rsvp.respondant.plusOne);
  return ret;
};

type AdminProps = {};

const Admin: FC<AdminProps> = ({}) => {
  const { rsvpDetails } = useAdmin();

  return (
    <div className="flex w-full flex-col overflow-hidden p-4 text-center">
      <h1 className="text-4xl font-bold">Admin</h1>
      <div className="overflow-y-auto">
        <div className="stats my-4 shadow">
          <div className="stat place-items-center">
            <div className="stat-title max-sm:text-xs">Coming</div>
            <div className="stat-value max-sm:text-2xl">
              {
                [
                  ...rsvpDetails.coming,
                  ...rsvpDetails.comingToCeremonyOnly,
                  ...rsvpDetails.comingToReceptionOnly,
                ].flatMap(getPeople).length
              }
            </div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title max-sm:text-xs">Coming Only</div>
            <div className="stat-value max-sm:text-2xl">
              {rsvpDetails.coming.flatMap(getPeople).length}
            </div>
          </div>
          <div className="stat place-items-center max-sm:hidden">
            <div className="stat-title max-sm:text-xs">Ceremony Only</div>
            <div className="stat-value max-sm:text-2xl">
              {rsvpDetails.comingToCeremonyOnly.flatMap(getPeople).length}
            </div>
          </div>
          <div className="stat place-items-center max-sm:hidden">
            <div className="stat-title max-sm:text-xs">Reception Only</div>
            <div className="stat-value max-sm:text-2xl">
              {rsvpDetails.comingToReceptionOnly.flatMap(getPeople).length}
            </div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title max-sm:text-xs">Not Coming</div>
            <div className="stat-value max-sm:text-2xl">
              {rsvpDetails.notComing.flatMap(getPeople).length}
            </div>
          </div>
        </div>
      </div>
      <AdminTab details={rsvpDetails} />
    </div>
  );
};

export default Admin;

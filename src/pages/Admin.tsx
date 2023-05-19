import { FC } from "react";
import useAdmin from "../hooks/useAdmin";
import { Respondant } from "../hooks/useRespondant";
import AdminTab from "../components/AdminTab";

export const getPeople = (rsvp: Respondant) => {
  const ret = [...rsvp.names];
  if (rsvp.plusOne) ret.push(rsvp.plusOne);
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

import classNames from "classnames";
import { FC, useState } from "react";
import { RSVP, RSVPDetails } from "../hooks/useAdmin";
import AdminTable, { Item } from "./AdminTable";
import { Age } from "../hooks/useRSVP";
import { getDisplayNameAge } from "../hooks/useRespondant";

export const getPeopleWithLastname = (rsvp: RSVP) => {
  let ret: Item[] = [...rsvp.respondant.names];
  ret = ret.map((person) => {
    return {
      ...person,
      name: person.name + " " + rsvp.respondant.lastname,
    };
  });
  if (rsvp.respondant.plusOne) ret.push(rsvp.respondant.plusOne);
  ret = ret.map((person) => {
    return {
      ...person,
      code: rsvp.code,
    };
  });
  return ret;
};

type Column = {
  name: string;
  key: string;
  transform?: (value: any) => string;
};

const columns = [
  {
    name: "Name",
    key: "name",
  },
  {
    name: "Age",
    key: "age",
    transform: (age: Age) => getDisplayNameAge(age),
  },
];

type AdminTabProps = {
  details: RSVPDetails;
};

const AdminTab: FC<AdminTabProps> = ({ details }) => {
  const [tab, setTab] = useState("Coming");

  const tabs: {
    name: string;
    component: JSX.Element;
    extraClassNames?: string;
  }[] = [
    {
      name: "Coming",
      component: (
        <AdminTable
          items={[
            ...details.coming,
            ...details.comingToCeremonyOnly,
            ...details.comingToReceptionOnly,
          ].flatMap(getPeopleWithLastname)}
          columns={columns}
          key={self.name}
        />
      ),
    },
    {
      name: "Coming Only",
      component: (
        <AdminTable
          items={details.coming.flatMap(getPeopleWithLastname)}
          columns={columns}
          key={self.name}
        />
      ),
    },
    {
      name: "Ceremony Only",
      component: (
        <AdminTable
          items={details.comingToCeremonyOnly.flatMap(getPeopleWithLastname)}
          columns={columns}
          key={self.name}
        />
      ),
      extraClassNames: "max-sm:hidden",
    },
    {
      name: "Reception Only",
      component: (
        <AdminTable
          items={details.comingToReceptionOnly.flatMap(getPeopleWithLastname)}
          columns={columns}
          key={self.name}
        />
      ),
      extraClassNames: "max-sm:hidden",
    },
    {
      name: "Not Coming",
      component: (
        <AdminTable
          items={details.notComing.flatMap(getPeopleWithLastname)}
          columns={columns}
          key={self.name}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="tabs tabs-boxed justify-center">
        {tabs.map((t) => (
          <button
            className={classNames(
              "tab",
              t.name === tab && "tab-active",
              t.extraClassNames
            )}
            onClick={() => setTab(t.name)}
            key={t.name}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div className="max-h-[600px] overflow-auto">
        {tabs.filter((t) => t.name === tab)[0].component}
      </div>
    </div>
  );
};

export default AdminTab;

export type { Column };

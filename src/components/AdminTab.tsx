import classNames from "classnames";
import { FC, useState } from "react";
import { RSVPDetails } from "../hooks/useAdmin";

const tabs: {
  name: string;
  component: JSX.Element;
}[] = [
  {
    name: "Coming",
    component: <div>Coming</div>,
  },
  {
    name: "Ceremony Only",
    component: <div>Ceremony Only</div>,
  },
  {
    name: "Reception Only",
    component: <div>Reception Only</div>,
  },
  {
    name: "Not Coming",
    component: <div>Not Coming</div>,
  },
];

type AdminTabProps = {
  details: RSVPDetails;
};

const AdminTab: FC<AdminTabProps> = ({}) => {
  const [tab, setTab] = useState("Coming");

  return (
    <div className="flex flex-col gap-2">
      <div className="tabs tabs-boxed justify-center">
        {tabs.map((t) => (
          <button
            className={classNames("tab", t.name === tab && "tab-active")}
            onClick={() => setTab(t.name)}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div>{tabs.filter((t) => t.name === tab)[0].component}</div>
    </div>
  );
};

export default AdminTab;

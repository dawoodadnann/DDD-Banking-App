import React from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";
import {
  FiDollarSign,
  FiCreditCard,
  FiLink,
  FiHome,
  FiPaperclip,
  FiHelpCircle,
  FiCalendar,
  FiHeadphones,
} from "react-icons/fi";

export const RouteSelectManager = () => {
  return (
    <div className="space-y-1 bg-zinc-800">
      <Route Icon={FiHome} selected={true} title="Home" linkTo="/" />
      <Route Icon={FiDollarSign} selected={false} title=" Faqs Page User And Manager" linkTo="/managerfaqpage" />
      <Route Icon={FiDollarSign} selected={false} title=" Approval User And Manager" linkTo="/managerapproval" />
      <Route Icon={FiDollarSign} selected={false} title=" Update User And Manager" linkTo="/managerupdate" />
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  linkTo,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  linkTo: string;
}) => {
  return (
    <Link to={linkTo}>
      <button
        className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
          selected
            ? " text-white shadow"
            : "hover: bg-transparent text-white shadow-none"
        }`}
      >
        <Icon className={selected ? "text-violet-500" : ""} />
        <span>{title}</span>
      </button>
    </Link>
  );
};

export default RouteSelectManager;

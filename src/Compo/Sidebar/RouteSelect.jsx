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

export const RouteSelect = () => {
  return (
    <div className="space-y-1">
      <Route Icon={FiHome} selected={true} title="Home" linkTo="/" />
      <Route Icon={FiDollarSign} selected={false} title="Transfer Money" linkTo="/money-transfer" />
      <Route Icon={FiCalendar} selected={false} title="Pay Bills" linkTo="/billing" />
      <Route Icon={FiCalendar} selected={false} title="Loan Application" linkTo="/loan" />
      <Route Icon={FiCreditCard} selected={false} title="Card Management" linkTo="/cards" />
      <Route Icon={FiHelpCircle} selected={false} title="Help" linkTo="/help" />
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
            ? "bg-zinc-800 text-white shadow"
            : "hover:bg-zinc-800 bg-transparent text-white shadow-none"
        }`}
      >
        <Icon className={selected ? "text-white" : ""} />
        <span>{title}</span>
      </button>
    </Link>
  );
};

export default RouteSelect;

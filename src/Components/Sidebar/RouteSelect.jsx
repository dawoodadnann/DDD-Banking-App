import React from "react";
import { IconType } from "react-icons";
import {
  FiDollarSign,
  FiCreditCard,
  FiLink,
  FiHome,
  FiPaperclip,
  FiCalendar
} from "react-icons/fi";

export const RouteSelect = () => {
  return (
    <div className="space-y-1">
     <Route Icon={FiHome} selected={true} title="Home" />
      <Route Icon={FiDollarSign} selected={false} title="Transfer Money" />
      <Route Icon={FiCalendar} selected={false} title="Pay Bills" />
      <Route Icon={ FiCreditCard} selected={false} title="Card Management" />
      <Route Icon={FiLink} selected={false} title="Integrations" />
      <Route Icon={FiDollarSign} selected={false} title="Finance" />
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
}) => {
  return (
    <button
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </button>
  );
}

export default RouteSelect
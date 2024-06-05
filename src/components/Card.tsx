import { Link } from "react-router-dom";
import { CardT } from "../utils/types";

const Card = ({ cardTitle, cardData, cardIcon, link }: CardT) => {
  return (
    <Link
      to={link}
      className="flex justify-between p-8 transition-all duration-75 ease-in bg-white rounded shadow-lg cursor-pointer hover:scale-95"
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-gray-500 ">{cardTitle}</h3>
        <h2 className="text-xl font-semibold text-black ">{cardData}</h2>
      </div>
      <div className="flex flex-col justify-center gap-4 items-between">
        <div className="p-3 text-white rounded-full bg-carrot">{cardIcon}</div>{" "}
        View
      </div>
    </Link>
  );
};

export default Card;

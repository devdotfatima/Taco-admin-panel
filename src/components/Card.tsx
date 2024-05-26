import React from "react";

type Props = {
  cardTitle: string;
  cardData: string;
  cardIcon: React.ReactElement;
};

const Card = ({ cardTitle, cardData, cardIcon }: Props) => {
  return (
    <div className="flex justify-between bg-white p-8 rounded shadow-lg cursor-pointer hover:scale-95 transition-all ease-in duration-75">
      <div className="flex flex-col  gap-2">
        <h3 className=" text-gray-500 font-medium ">{cardTitle}</h3>
        <h2 className="text-xl font-semibold text-black ">{cardData}</h2>
      </div>
      <div className="flex items-between gap-4 justify-center flex-col">
        <div className="bg-carrot text-white p-3 rounded-full">{cardIcon}</div>
        <a
          href="http://"
          className=" text-xs text-carrot py-1 border-2 rounded-full text-center"
        >
          {" "}
          View
        </a>
      </div>
    </div>
  );
};

export default Card;

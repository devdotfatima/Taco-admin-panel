import { TbTruck } from "react-icons/tb";
import Card from "../components/Card";
import Header from "../components/Header";
import DashboardChart from "../components/Chart";
import { GoTasklist } from "react-icons/go";
import { MdOutlinePendingActions } from "react-icons/md";

import { BiGroup } from "react-icons/bi";

const Dashboard = () => {
  return (
    <>
      <Header pageTitle="Dashboard" />

      <div className="grid grid-cols-1 gap-4 mb-10 xl:gap-8 md:grid-cols-2 xl:grid-cols-4">
        <Card
          cardData="400"
          cardTitle="Food Trucks"
          cardIcon={<TbTruck size={30} />}
        />
        <Card
          cardData="1700"
          cardTitle="Orders"
          cardIcon={<GoTasklist size={30} />}
        />
        <Card
          cardData="10"
          cardTitle="Pending Truck Owners"
          cardIcon={<MdOutlinePendingActions size={30} />}
        />{" "}
        <Card
          cardData="300"
          cardTitle="Total Truck Owners"
          cardIcon={<BiGroup size={30} />}
        />
      </div>
      <div className="p-10 mb-10 bg-white rounded shadow-md">
        <DashboardChart />
      </div>
    </>
  );
};

export default Dashboard;

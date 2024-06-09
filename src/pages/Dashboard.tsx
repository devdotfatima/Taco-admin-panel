import Card from "../components/Card";
import Header from "../components/Header";
import DashboardChart from "../components/Chart";
import { USER_ROLES, cards as initialCards } from "../utils/const";
import { useEffect, useState } from "react";
import { getTotalNumberOfTrucks, getTotalNumberOfUsersByRole } from "../api";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [cards, setCards] = useState(initialCards);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getTotalNumberOfTrucks();

      const totalTruckOwnersResponse = await getTotalNumberOfUsersByRole(
        USER_ROLES.TRUCK_OWNER
      );

      const totalTruckSupervisorsResponse = await getTotalNumberOfUsersByRole(
        USER_ROLES.TRUCK_SUPERVISOR
      );
      setLoading(false);
      setCards((prevCards) =>
        prevCards.map((card) => {
          switch (card.cardTitle) {
            case "Total Food Trucks":
              return { ...card, cardData: response.data.toString() };
            case "Total Truck Owners":
              return {
                ...card,
                cardData: totalTruckOwnersResponse.data.toString(),
              };
            case "Total Truck Supervisors":
              return {
                ...card,
                cardData: totalTruckSupervisorsResponse.data.toString(),
              };
            // Add more cases as needed for other user roles
            default:
              return card;
          }
        })
      );
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <Header pageTitle="Dashboard" />
          <Loader />
        </>
      ) : (
        <>
          <Header pageTitle="Dashboard" />

          <div className="grid grid-cols-1 gap-4 mb-10 xl:gap-8 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <Card
                key={card.cardTitle}
                link={card.link}
                cardData={card.cardData}
                cardTitle={card.cardTitle}
                cardIcon={card.cardIcon}
              />
            ))}
          </div>
          <div className="p-10 mb-10 bg-white rounded shadow-md">
            <DashboardChart />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;

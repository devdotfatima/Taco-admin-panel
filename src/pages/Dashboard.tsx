import Card from "../components/Card";
import Header from "../components/Header";
import DashboardChart from "../components/Chart";
import { cards } from "../utils/const";

const Dashboard = () => {
  return (
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
  );
};

export default Dashboard;

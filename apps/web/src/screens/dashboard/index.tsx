import LogoutButton from "@app/components/logout-button";
import { Card } from "@crab-stash/ui";

const Dashboard = () => {
  return (
    <>
      <h1>Turborepo Starter: Web</h1>
      <LogoutButton />
      <Card title="Card Title" description="Card Description" footerContent="Card Footer">
        Card Content
      </Card>
    </>
  );
};

export default Dashboard;

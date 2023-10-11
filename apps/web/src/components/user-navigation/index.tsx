import useMeQuery from "@app/hooks/use-me-query";
import { Avatar, Button, Dropdown } from "@crab-stash/ui";

function UserNavigation() {
  const { data } = useMeQuery();

  console.log(data);

  return (
    <Dropdown
      className="w-56"
      trigger={
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8" fullName="Szymon Kin" src={undefined} />
        </Button>
      }
      label={
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">shadcn</p>
          <p className="text-xs leading-none text-muted-foreground">m@example.com</p>
        </div>
      }
      itemGroups={[
        [
          {
            label: "Profile",
          },
          {
            label: "Settings",
          },
          {
            label: "New Warehouse",
          },
        ],
        [
          {
            label: "Log out",
          },
        ],
      ]}
    />
  );
}

export default UserNavigation;

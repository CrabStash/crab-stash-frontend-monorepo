import { useRouter } from "next/router";

import { URLS } from "@app/constants/urls";
import { useLogoutMutation } from "@app/hooks/mutations/use-logout-mutation";
import useMeQuery from "@app/hooks/queries/use-me-query";
import { Avatar, Button, Dropdown } from "@crab-stash/ui";
import type { User } from "types";

const createFullName = (user: User) => {
  if (user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }

  return user.firstName;
};

interface UserNavigationProps {
  user: User;
}

function UserNavigation({ user }: UserNavigationProps) {
  const { data } = useMeQuery();
  const { mutate } = useLogoutMutation();
  const router = useRouter();

  const fullName = createFullName(user);

  return (
    <Dropdown
      className="w-56"
      trigger={
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8" fullName={fullName} src={undefined} />
        </Button>
      }
      label={
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{fullName}</p>
          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
        </div>
      }
      itemGroups={[
        [
          {
            label: "Profile",
            onClick: () => {
              if (!data?.response.data.id) return;

              router.push(URLS.profile(data?.response.data.id));
            },
          },
          {
            label: "Settings",
            onClick: () => router.push(URLS.profileSettings),
          },
          {
            label: "Create Warehouse",
            onClick: () => router.push(URLS.createWarehouse),
          },
        ],
        [
          {
            label: "Log out",
            onClick: () => mutate(),
          },
        ],
      ]}
    />
  );
}

export default UserNavigation;

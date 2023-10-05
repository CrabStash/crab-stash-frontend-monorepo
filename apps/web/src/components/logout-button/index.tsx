import { useLogoutMutation } from "./useLogoutMutation";

import { Button } from "@crab-stash/ui";

const LogoutButton = () => {
  const { mutate } = useLogoutMutation();

  return <Button onClick={() => mutate()}>Logout</Button>;
};

export default LogoutButton;

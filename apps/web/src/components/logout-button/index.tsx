import { useLogoutMutation } from "./use-logout-mutation";

import { Button } from "@crab-stash/ui";

function LogoutButton() {
  const { mutate } = useLogoutMutation();

  return <Button onClick={() => mutate()}>Logout</Button>;
}

export default LogoutButton;

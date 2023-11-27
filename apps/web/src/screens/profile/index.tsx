import { useRouter } from "next/router";

import { URLS } from "@app/constants/urls";
import { useLogoutMutation } from "@app/hooks/mutations/use-logout-mutation";
import useMeQuery from "@app/hooks/queries/use-me-query";
import useUserQuery from "@app/hooks/queries/use-user-query";
import { Avatar, Button, Card, useToast } from "@crab-stash/ui";

function Profile() {
  const { data } = useUserQuery();
  const { data: meData } = useMeQuery();
  const { mutate } = useLogoutMutation();
  const router = useRouter();
  const userId = router.query.userId as string;
  const user = data?.response.data;
  const isMe = userId === meData?.response.data.id;
  const { toast } = useToast();

  const handleCopyMail = async () => {
    await navigator.clipboard.writeText(user?.email || "");

    toast({
      title: "Copied to clipboard",
      description: "User email has been copied to clipboard",
    });
  };

  if (!user) return null;

  return (
    <div className="p-6 flex justify-center items-start h-screen">
      <Card title="Profile card">
        <div className="px-6 py-8 md:p-12 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar
              className="h-24 w-24"
              fullName={`${user.firstName} ${user.lastName}`}
              src={undefined}
            />
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-lg text-gray-500 dark:text-gray-400">{user.email}</div>
          </div>
          <div className="flex flex-col space-y-4">
            {isMe ? (
              <>
                <Button className="w-full" onClick={() => router.push(URLS.profileSettings)}>
                  Edit Profile
                </Button>
                <Button className="w-full" variant="outline" onClick={() => mutate()}>
                  Log out
                </Button>
              </>
            ) : (
              <Button className="w-full" onClick={handleCopyMail}>
                Copy mail
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Profile;

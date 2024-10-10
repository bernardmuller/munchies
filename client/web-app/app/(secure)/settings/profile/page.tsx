import Profile from "@/app/(secure)/settings/profile/Profile";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getCurrentLoggedInUser} from "@/lib/http/client/users/getCurrentLoggedInUser";

export default async function ProfilePage() {
  const {getToken} = auth();
  const token = await getToken({ template: "1_HOUR" }).then((t) =>
    t?.toString(),
  );

  if (!token) {
    redirect(`/sign-in`);
  }

  const user = await getCurrentLoggedInUser(token!);

  if (!user.ok && user.status >= 500) {
    redirect("/something-went-wrong");
  }
  return <Profile
    firstName={user.data?.firstName}
    lastName={user.data?.lastName}
    email={user.data?.email}
    image={user.data?.image}
    items={user.data?.numberOfItems}
    lists={user.data?.numberOfLists}
  />;
}

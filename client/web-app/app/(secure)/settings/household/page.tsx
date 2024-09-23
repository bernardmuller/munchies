import HouseholdManagement from "./Household";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCurrentUserHouseholdDetails } from "@/lib/http/client/households/getCurrentUserHouseholdDetails";

export default async function HouseholdPage() {
  const { getToken } = auth();
  const token = await getToken({ template: "1_HOUR" }).then((t) =>
    t?.toString(),
  );

  if (!token) {
    redirect(`/sign-in`);
  }

  const household = await getCurrentUserHouseholdDetails(token!);

  console.log(household);

  if (!household.ok && household.status >= 500) {
    redirect("/something-went-wrong");
  }

  return <HouseholdManagement household={household.data} />;
}

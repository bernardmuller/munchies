"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clipboard, LogOut, UserPlus, Home } from "lucide-react";
import {
  Household,
  Member,
} from "@/lib/http/client/households/getCurrentUserHouseholdDetails";
import useCurrentUserHouseholdDetails from "@/lib/http/hooks/households/useCurrentUserHouseholdDetails";
import { FieldValues } from "react-hook-form";
import JoinHouseholdDialog from "./JoinHouseholdDialog";
import useJoinHousehold from "@/lib/http/hooks/households/useJoinHousehold";
import useLeaveHousehold from "@/lib/http/hooks/households/useLeaveHousehold";
import useCreateHousehold from "@/lib/http/hooks/households/useCreateHousehold";
import { useCopyToClipboard } from "@/lib/utils/copyToClipboard";

type Props = {
  household: Household | null;
};

export default function HouseholdDashboard({ household }: Props) {
  const {
    data: householdData,
    isLoading,
    isFetching,
    isRefetching,
  } = useCurrentUserHouseholdDetails({
    initialData: household!,
  });
  const createHoushold = useCreateHousehold();
  const joinHoushold = useJoinHousehold();
  const leaveHoushold = useLeaveHousehold();
  const [copied, copy] = useCopyToClipboard();
  const [hasCopied, setHasCopied] = useState(false);

  const handleJoinHousehold = async (data: FieldValues) => {
    await joinHoushold.mutateAsync({
      householdId: data.householdId,
    });
  };

  const copyToClipboard = async () => {
    copy(householdData.id).catch((error) => {
      console.error("Failed to copy!", error);
    });
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  if (isLoading || isFetching || isRefetching) {
    return <div>Loading...</div>;
  }

  if (!householdData || !householdData?.id) {
    return (
      <div className=" mx-auto p-4 max-w-md">
        <h2 className="text-2xl font-bold text-center mb-1">
          Welcome to My Household
        </h2>
        <h4 className="text-md text-center mb-4 self-center px-4 text-gray-500">
          Get started by creating a household or join an existing one.
          When part of a household you can share a grocery list with
          other members.
        </h4>
        <div className="space-y-4">
          <Button
            className="w-full"
            onClick={() => createHoushold.mutateAsync()}
            isLoading={createHoushold.isLoading}
          >
            <Home className="mr-2 h-4 w-4" /> Create Household
          </Button>

          <JoinHouseholdDialog
            trigger={
              <Button variant="outline" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" /> Join
                Household
              </Button>
            }
            onSubmit={handleJoinHousehold}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Household</h2>
          <Button
            variant="destructive"
            onClick={() => leaveHoushold.mutateAsync()}
            isLoading={leaveHoushold.isLoading}
          >
            <LogOut className="mr-2 h-4 w-4" /> Leave
          </Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Members</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {householdData.members.map((member: Member) => (
              <div
                key={member.id}
                className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md"
              >
                <Avatar>
                  {/*
                  <AvatarImage
                    src={member.firstname[0]}
                    alt={member.firstname}
                  />
                  */}
                  <AvatarFallback>
                    {member.firstname[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">
                  {member.firstname} {member.lastname}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Invite New Members
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                value={householdData.id}
                readOnly
                className="flex-grow"
              />
              <Button variant="outline" onClick={copyToClipboard}>
                {hasCopied ? (
                  <UserPlus className="mr-2 h-4 w-4" />
                ) : (
                  <Clipboard className="mr-2 h-4 w-4" />
                )}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Share this ID with others to invite them to your
            household.
          </p>
        </div>
      </div>
    </div>
  );
}

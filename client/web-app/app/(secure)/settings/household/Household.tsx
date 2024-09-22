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

type Props = {
  household: Household | null;
};

export default function HouseholdDashboard({ household }: Props) {
  const { data: householdData, isLoading } = useCurrentUserHouseholdDetails({
    initialData: household!,
  });
  const joinHoushold = useJoinHousehold();

  const handleJoinHousehold = async (data: FieldValues) => {
    await joinHoushold.mutateAsync({
      householdId: data.householdId,
    });
  };

  const [householdId, setHouseholdId] = useState("");
  const [newHouseholdName, setNewHouseholdName] = useState("");

  // States for Household Management
  const [copied, setCopied] = useState(false);

  const handleCreateHousehold = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send a request to your backend to create the household
    console.log(`Creating new household: ${newHouseholdName}`);
    setHouseholdId(`HH-${Math.random().toString(36).substr(2, 9)}`);
    setNewHouseholdName("");
  };

  const handleLeaveHousehold = () => {
    // Here you would typically send a request to your backend to leave the household
    console.log("Leaving household");
    setHouseholdId("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(householdId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!householdData && !householdData?.id) {
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
          <Button className="w-full">
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
            onClick={handleLeaveHousehold}
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
                  <AvatarImage
                    src={member.firstname[0]}
                    alt={member.firstname}
                  />
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
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              value={householdData.id}
              readOnly
              className="flex-grow"
            />
            <Button variant="outline" onClick={copyToClipboard}>
              {copied ? (
                <UserPlus className="mr-2 h-4 w-4" />
              ) : (
                <Clipboard className="mr-2 h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
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

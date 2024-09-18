"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clipboard, LogOut, UserPlus, Home } from "lucide-react";

export default function HouseholdDashboard() {
  const [isInHousehold, setIsInHousehold] = useState(false);
  const [householdId, setHouseholdId] = useState("");
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]);

  // States for Household Actions
  const [joinHouseholdId, setJoinHouseholdId] = useState("");
  const [newHouseholdName, setNewHouseholdName] = useState("");
  const [joinError, setJoinError] = useState("");

  // States for Household Management
  const [copied, setCopied] = useState(false);

  const handleJoinHousehold = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinError("");
    if (joinHouseholdId.trim() === "") {
      setJoinError("Please enter a valid Household ID");
      return;
    }
    // Here you would typically send a request to your backend to join the household
    console.log(`Joining household with ID: ${joinHouseholdId}`);
    setHouseholdId(joinHouseholdId);
    setIsInHousehold(true);
    setJoinHouseholdId("");
  };

  const handleCreateHousehold = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send a request to your backend to create the household
    console.log(`Creating new household: ${newHouseholdName}`);
    setHouseholdId(`HH-${Math.random().toString(36).substr(2, 9)}`);
    setIsInHousehold(true);
    setNewHouseholdName("");
  };

  const handleLeaveHousehold = () => {
    // Here you would typically send a request to your backend to leave the household
    console.log("Leaving household");
    setIsInHousehold(false);
    setHouseholdId("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(householdId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isInHousehold) {
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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Home className="mr-2 h-4 w-4" /> Create
                Household
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Create a New Household
                </DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleCreateHousehold}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="household-name">
                    Household Name
                  </Label>
                  <Input
                    id="household-name"
                    value={newHouseholdName}
                    onChange={(e) =>
                      setNewHouseholdName(e.target.value)
                    }
                    placeholder="Enter household name"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create Household
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" /> Join
                Household
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Join an Existing Household
                </DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleJoinHousehold}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="household-id">
                    Household ID
                  </Label>
                  <Input
                    id="household-id"
                    value={joinHouseholdId}
                    onChange={(e) =>
                      setJoinHouseholdId(e.target.value)
                    }
                    placeholder="Enter household ID"
                    required
                  />
                  {joinError && (
                    <p className="text-sm text-red-500">
                      {joinError}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Join Household
                </Button>
              </form>
            </DialogContent>
          </Dialog>
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
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md"
              >
                <Avatar>
                  <AvatarImage
                    src={member.avatar}
                    alt={member.name}
                  />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">
                  {member.name}
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
              value={householdId}
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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldValues, useForm } from "react-hook-form";
import React from "react";

type Props = {
  trigger: React.ReactNode;
  onSubmit: (data: FieldValues) => void;
};

export default function JoinHouseholdDialog({ trigger, onSubmit }: Props) {
  const { handleSubmit, register, formState } = useForm();
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join an Existing Household</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="household-id">Household ID</Label>
            <Input
              id="household-id"
              {...register("householdId")}
              placeholder="Enter household ID"
              required
            />
            {formState.errors.householdId && (
              <p className="text-sm text-red-500">
                Please enter a valid Household ID
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Join Household
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

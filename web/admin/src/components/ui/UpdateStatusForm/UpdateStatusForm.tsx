"use client";

import { FaRunning, FaRegStopCircle } from "react-icons/fa";

import { Button } from "@/components/ui/button";

type UpdateStatusFormProps = {
  isDisabledActive: boolean;
  isDisableStop: boolean;
  handleUpdateStatusToActive: () => void;
  handleUpdateStatusToStop: () => void;
};

export const UpdateStatusForm: React.FC<UpdateStatusFormProps> = ({
  isDisabledActive,
  isDisableStop,
  handleUpdateStatusToActive,
  handleUpdateStatusToStop,
}) => {
  return (
    <div className="flex items-center justify-between">
      {/* active */}
      <div className="mr-2">
        <Button
          disabled={isDisabledActive}
          variant="ghost"
          onClick={handleUpdateStatusToActive}
        >
          <FaRunning className="mr-1" />
          <span className="text-xs">ACTIVE</span>
        </Button>
      </div>

      {/* stop */}
      <div>
        <Button
          disabled={isDisableStop}
          variant="ghost"
          onClick={handleUpdateStatusToStop}
        >
          <FaRegStopCircle className="mr-1" />
          <span className="text-xs">STOP</span>
        </Button>
      </div>
    </div>
  );
};

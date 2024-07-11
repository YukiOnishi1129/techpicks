'use client';

import { VariantProps } from 'class-variance-authority';
import { useState, useCallback, FC } from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { PlatformType } from '@/types/platform';

import { SelectPlatformDialogContent } from './SelectPlatformDialogContent';

type SelectPlatformDialogProps = {
  label?: string;
  variant?: VariantProps<typeof buttonVariants>['variant'];
  selectedPlatform?: PlatformType;
  handleSelectPlatform: (platformId: string) => void;
};

export const SelectPlatformDialog: FC<SelectPlatformDialogProps> = ({
  label = 'SELECT',
  variant,
  selectedPlatform,
  handleSelectPlatform,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = useCallback(() => setOpenDialog(true), []);
  const handleDialogClose = useCallback(() => setOpenDialog(false), []);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          className="font-bold"
          onClick={handleDialogOpen}
        >
          {label}
        </Button>
      </DialogTrigger>
      {openDialog && (
        <SelectPlatformDialogContent
          handleDialogClose={handleDialogClose}
          selectedPlatform={selectedPlatform}
          handleSelectPlatform={handleSelectPlatform}
        />
      )}
    </Dialog>
  );
};

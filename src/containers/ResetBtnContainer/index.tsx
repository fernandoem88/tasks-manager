"use client";

import { UiButton } from "@/ui/Button";
import { resetStore } from "@/server-storage";
import { useDispatch } from "@/contexts/AppStateProvider/hooks/useDispatch";
import { STORAGE_ITEM } from "../LocalStorageContainer";
import { useAppState } from "@/contexts/AppStateProvider";

export const ResetBtnContainer = () => {
  const { boards } = useAppState();
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch("reset");
    resetStore();
    localStorage.removeItem(STORAGE_ITEM);
  };

  const hasBoards = !!Object.keys(boards).length;

  if (!hasBoards) return null;

  return (
    <UiButton variant="contained" color="secondary" onClick={handleReset}>
      Reset
    </UiButton>
  );
};

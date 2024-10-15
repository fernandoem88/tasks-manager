"use client";

import { UiButton } from "@/ui/Button";
import { resetStore } from "@/server-storage";
import { useDispatch } from "@/contexts/AppStateProvider/hooks/useDispatch";
import { STORAGE_ITEM } from "../LocalStorageContainer";

export const ResetBtnContainer = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch("reset");
    resetStore();
    localStorage.removeItem(STORAGE_ITEM);
  };

  return (
    <UiButton variant="contained" color="secondary" onClick={handleReset}>
      Reset
    </UiButton>
  );
};

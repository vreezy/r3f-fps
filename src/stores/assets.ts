import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  assets: Record<string, any>;
};

type Actions = {
  addAsset: (assetId: string, asset: any) => void;
};

export const useAssetsStore = create(
  immer<State & Actions>((set) => ({
    assets: {},
    addAsset: (assetId: string, asset: any) =>
      set((state) => {
        state.assets[assetId] = asset;
      }),
  }))
);

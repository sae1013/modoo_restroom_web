import { createStore } from 'zustand/vanilla';

export type MapState = {
  hasMapLoaded: boolean;
};

export type MapActions = {
  setMapLoaded: (loaded: boolean) => void;
};

export type MapStore = MapState & MapActions;

export const defaultInitialState: MapState = {
  hasMapLoaded: false,
};

export const createMapStore = (initState: MapState = defaultInitialState) => {
  return createStore<MapStore>()((set) => ({
    ...initState,
    setMapLoaded: (loaded: boolean) => set({ hasMapLoaded: loaded }),
  }));
};

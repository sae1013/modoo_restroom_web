import { createStore } from 'zustand/vanilla';

export type Place = any;

export type PlaceState = {
  places: Place[] | [];
};

export type PlaceActions = {
  setPlaces: (place: PlaceState) => void;
};

export type PlaceStore = PlaceState & PlaceActions;

export const defaultIntialState: PlaceStore = {
  places: [],
};

export const createPlaceStore = (initState: PlaceState = defaultIntialState) => {
  return createStore<PlaceStore>()((set) => {
    return {
      ...initState,
      setPlaces: (places: Place) => set(() => ({ places: places })),
    };
  });
};

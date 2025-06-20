import { createStore } from 'zustand/vanilla';

export type Place = any;

export type PlaceState = {
  places: Place[] | [];
};

export type PlaceActions = {
  setPlaces: (place: PlaceState) => void;
  addPlace: (place: PlaceState) => void;
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
      addPlace: (place: Place) => {
        set((state) => {
          // 중복제거하고 삽입
          const filteredPlaces = state.places.filter((p) => p.id !== place.id);
          return { places: [...filteredPlaces, place] };
        });
      },
    };
  });
};

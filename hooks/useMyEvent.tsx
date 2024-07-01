import { create } from "zustand";

export type MyEventType = {
  id: string;
  name: string;
  image: string;
  description: string;
  date?: string;
  time: string;
  location: string;
  roomNo: number;
  rules?: string[];
};

type UseMyEventType = {
  myEvent: MyEventType | null;
  setMyEvent: (myEvent: MyEventType | null) => void;
};

export const UseMyEvent = create<UseMyEventType>((set) => ({
  myEvent: null,
  setMyEvent: (myEvent) => set({ myEvent }),
}));

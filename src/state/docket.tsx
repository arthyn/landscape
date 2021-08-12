import create from "zustand";
import _ from "lodash";
import api from "./api";
import { useCallback } from 'react';

export interface Docket {
  title: string;
  info: string;
  color: string;
  base: string;
  website: string;
  license: string;
  version: string;
}

export interface Treaty extends Docket {
  ship: string;
  desk: string;
  cass: string;
  hash: string;
}

interface Dockets {
  [ref: string]: Docket;
}

interface Treaties {
  [ref: string]: Treaties;
}

interface DocketState {
  fetchCharges: () => Promise<void>;
  charges: Dockets;
  treaties: Treaties;
  request: (ship: string, desk: string) => Promise<Treaty>;
}

const useDocketState = create<DocketState>((set, get) => ({
  fetchCharges: async () => {
    const json = await (await fetch("/~/scry/docket/charges.json")).json();
    set({
      charges: json.initial,
    });
  },
  request: async (ship: string, desk: string) => {
    const key = `${ship}/${desk}`;
    const state = get();
    if (key in state.treaties) {
      return state.treaties[key];
    }
    const result = await api.subscribeOnce("docket", `/treaty/${key}`, 20000);
    const treaty = { ...result, ship, desk };
    set((state) => ({
      treaties: { ...state.treaties, [key]: treaty },
    }));
    return treaty;
  },
  treaties: {},
  charges: {},
  set
}));

api.subscribe({
  app: 'docket',
  path: '/charges',
  event: (data) => {
    useDocketState.setState(state => {
      console.log(data);
      if('add-dock' in data) {
        const { desk, docket } = data['add-dock'];
        return { charges: {...state.charges, [desk]: docket }};
      }
      if('del-dock' in data) {
        const desk = data['del-dock'];
        return { charges: _.omit(state.charges, desk) }
      }
      return { charges: state.charges };
    });

  }
});




const selCharges = (s: DocketState) => {
  return _.omit(s.charges, "grid");
};

export function useCharges() {
  return useDocketState(selCharges);
}

export function useCharge(desk: string) {
  return useDocketState(useCallback(state => state.charges[desk], [desk]));
}

const selRequest = (s: DocketState) => s.request;
export function useRequestDocket() {
  return useDocketState(selRequest);
}

export default useDocketState;

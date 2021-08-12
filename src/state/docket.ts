import create from "zustand";
import fuzzy from 'fuzzy';
import { omit } from "lodash-es";
import api from "./api";
import { useCallback } from 'react';
import { providers, treaties } from "./mock-data";
import { useMockData } from "../main";

export type DeskStatus = 'active' | 'suspended';
export interface Docket {
  title: string;
  info?: string;
  color: string;
  base: string;
  website: string;
  license: string;
  version: string;

  // yet to be implemented
  img?: string;
  status: DeskStatus;
}

export interface Treaty extends Docket {
  ship: string;
  desk: string;
  cass: string;
  hash: string;
}

export interface Dockets {
  [ref: string]: Docket;
}

export interface Treaties {
  [ref: string]: Treaty;
}

export interface Provider {
  shipName: string;
  nickname?: string;
  status?: string;
}

interface DocketState {
  fetchCharges: () => Promise<void>;
  charges: Dockets;
  treaties: Treaties;
  request: (ship: string, desk: string) => Promise<Treaty>;
  fetchProviders: (query?: string) => Promise<Provider[]>;
  fetchProviderTreaties: (provider: string) => Promise<Treaty[]>;
  toggleDocket: (desk: string) => Promise<void>;
  installDocket: (ship: string, desk: string) => Promise<number | void>;
  uninstallDocket: (desk: string) => Promise<number | void>;
}

async function fakeRequest<T>(data: T, time = 300): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  })
}

const stableTreatyMap = new Map<string, Treaty[]>();

const useDocketState = create<DocketState>((set, get) => ({
  fetchCharges: async () => {
    if (useMockData) {
      set({ charges: await fakeRequest(treaties) });
      return;
    }

    const json = await (await fetch("/~/scry/docket/charges.json")).json();
    set({
      charges: json.initial,
    });
  },
  fetchProviders: async (query?: string) => {
    const searchTexts = providers.map(p => p.shipName + (p.nickname || ''));
    return fakeRequest(fuzzy.filter(query || '', searchTexts).map(el => providers[el.index]))
  },
  fetchProviderTreaties: async (provider: string) => {
    const treatyList = Object.values(treaties);

    if (!stableTreatyMap.has(provider)) {
      stableTreatyMap.set(provider, treatyList.filter(() => !!Math.round(Math.random())))
    }

    return fakeRequest(stableTreatyMap.get(provider) || []);
  },
  request: async (ship: string, desk: string) => {
    if (useMockData) {
      set({ treaties: await fakeRequest(treaties) });
      return treaties[desk];
    }

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
  installDocket: async (ship: string, desk: string) => {
    if (useMockData) {
      const docket = await get().request(ship, desk);
      set(state => addCharge(state, { desk, docket }));
    }

    return api.poke({
      app: 'hood',
      mark: 'kiln-install',
      json: {
        ship,
        desk,
        local: desk
      }
    });
  },
  uninstallDocket: async (desk: string) => {
    if (useMockData) {
      set(state => delCharge(state, desk))
    }

    return api.poke({
      app: 'docket',
      mark: 'docket-uninstall',
      json: desk
    }); 
  },
  toggleDocket: async (desk: string) => {
    set(state => {
      const docket = state.charges[desk];
      docket.status = docket.status === 'active' ? 'suspended' : 'active';
      return { charges: state.charges };
    })
  },
  treaties: {},
  charges: {},
  set
}));

interface AddDockEvent {
  'add-dock': {
    desk: string;
    docket: Docket;
  }
}

interface DelDockEvent {
  'del-dock': string;
}

type DocketEvent = AddDockEvent | DelDockEvent;

function addCharge(state: DocketState, { desk, docket }: AddDockEvent['add-dock']) {
  return { charges: {...state.charges, [desk]: docket }};
}

function delCharge(state: DocketState, desk: DelDockEvent['del-dock']) {
  return { charges: omit(state.charges, desk) }
}

api.subscribe({
  app: 'docket',
  path: '/charges',
  event: (data: DocketEvent) => {
    useDocketState.setState(state => {
      console.log(data);

      if('add-dock' in data) {
        return addCharge(state, data['add-dock']);
      }

      if('del-dock' in data) {
        return delCharge(state, data['del-dock'])
      }

      return { charges: state.charges };
    });

  }
});




const selCharges = (s: DocketState) => {
  return omit(s.charges, "grid");
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

import fuzzy from 'fuzzy';
import { omit } from "lodash-es";
import api from "./api";
import { useCallback } from 'react';
import { providers, treaties } from "./mock-data";
import { queryClient } from '../app';

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

const useMockData = import.meta.env.MODE === 'mock'

function makeKeyFn(key: string) {
  return function (childKeys: string[] = []) {
    return [key].concat(childKeys);
  }
}

export const chargesKey = makeKeyFn('charges');

export const providersKey = makeKeyFn('providers');

export const treatyKey = makeKeyFn('treaty');

async function fakeRequest<T>(data: T, time = 300): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  })
}

const stableTreatyMap = new Map<string, Treaty[]>();

interface ChargesResponse {
  initial: Dockets;
}

export async function fetchCharges(): Promise<Dockets> {
  const charges = queryClient.getQueryData<Dockets>(chargesKey());
  if (useMockData && charges) {
    return charges;
  }

  const dockets = useMockData 
    ? await fakeRequest(treaties) 
    : (await (await fetch("/~/scry/docket/charges.json")).json() as ChargesResponse).initial;

  return Object.entries(dockets).reduce((obj: Dockets, [key, value]) => {
    obj[key] = normalizeDocket(value);
    return obj;
  }, {})
}

export async function fetchProviders(query?: string): Promise<Provider[]> {
  const searchTexts = providers.map(p => p.shipName + (p.nickname || ''));
  return fakeRequest(fuzzy.filter(query || '', searchTexts).map(el => providers[el.index]))
}

export async function fetchProviderTreaties(provider: string): Promise<Treaty[]> {
  const treatyList = Object.values(treaties).map(normalizeDocket);

  if (!stableTreatyMap.has(provider)) {
    stableTreatyMap.set(provider, treatyList.filter(() => !!Math.round(Math.random())))
  }

  return fakeRequest(stableTreatyMap.get(provider) || []);
}

export async function requestTreaty(ship: string, desk: string): Promise<Treaty> {
  if (useMockData) {
    return await fakeRequest(treaties[desk]);
  }

  const key = `${ship}/${desk}`;
  const result = await api.subscribeOnce("docket", `/treaty/${key}`, 20000);
  return { ...normalizeDocket(result), ship, desk };
}

export async function installDocket(ship: string, desk: string): Promise<number | void> {
  if (useMockData) {
    const docket = normalizeDocket(await requestTreaty(ship, desk));
    const charges = await queryClient.fetchQuery(chargesKey(), fetchCharges);
    addCharge(charges, { desk, docket });
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
}

export async function uninstallDocket(desk: string): Promise<number | void> {
  if (useMockData) {
    const charges = await queryClient.fetchQuery(chargesKey(), fetchCharges);
    delCharge(charges, desk);
  }

  return api.poke({
    app: 'docket',
    mark: 'docket-uninstall',
    json: desk
  }); 
}

export async function toggleDocket(desk: string): Promise<void> {
  const charges = await queryClient.fetchQuery(chargesKey(), fetchCharges);
  const docket = (charges || {})[desk];
  docket.status = docket.status === 'active' ? 'suspended' : 'active';
}

function normalizeDocket<T extends Docket>(docket: T): T {
  return {
    ...docket,
    status: docket.status || 'active',
    color: `#${docket.color.slice(2).replace('.', '')}`.toUpperCase()
  }
}

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

function addCharge(charges: Dockets | undefined, { desk, docket }: AddDockEvent['add-dock']) {
  queryClient.setQueryData(chargesKey(), {...charges, [desk]: docket });
}

function delCharge(charges: Dockets | undefined, desk: DelDockEvent['del-dock']) {  
  queryClient.setQueryData(chargesKey(), omit(charges, desk));
}

api.subscribe({
  app: 'docket',
  path: '/charges',
  event: (data: DocketEvent) => {
    const charges = queryClient.getQueryData<Dockets>(chargesKey());
    console.log(data);

    if('add-dock' in data) {
      return addCharge(charges, data['add-dock']);
    }

    if('del-dock' in data) {
      return delCharge(charges, data['del-dock'])
    }
  }
});




// const selCharges = (s: DocketState) => {
//   return omit(s.charges, "grid");
// };

// export function useCharges() {
//   return useDocketState(selCharges);
// }

// export function useCharge(desk: string) {
//   return useDocketState(useCallback(state => state.charges[desk], [desk]));
// }

// const selRequest = (s: DocketState) => s.request;
// export function useRequestDocket() {
//   return useDocketState(selRequest);
// }

// export default useDocketState;

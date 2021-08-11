import fuzzy from 'fuzzy';
import slugify from 'slugify';
import { apps, providers } from "./mock-data";

export type AppStatus = 'active' | 'suspended';

export interface Provider {
  shipName: string;
  nickname?: string;
  status?: string;
}

export interface App {
  name: string;
  provider: string;
  description?: string;
  status: AppStatus;
  url: string;
  color: string;
  light?: boolean;
  img?: string;
  meta: MetaData[];
}

export interface MetaData {
  attr: string;
  value: string;
}

async function fakeRequest<T>(data: T, time = 300): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  })
}

export async function getProviders(query?: string): Promise<Provider[]> {
  const searchTexts = providers.map(p => p.shipName + (p.nickname || ''));
  return fakeRequest(fuzzy.filter(query || '', searchTexts).map(el => providers[el.index]))
}

const stableAppList = new Map<string, App[]>();

export async function getApps(dev?: string): Promise<App[]> {
  let appList = apps;
  
  if (dev && !stableAppList.has(dev)) {
    stableAppList.set(dev, apps.filter(() => !!Math.round(Math.random())))
  }

  if (dev) {
    appList = stableAppList.get(dev) as App[];
  }

  return fakeRequest(appList);
}

export async function getApp(name: string): Promise<App | undefined> {
  return fakeRequest(apps.find(app => slugify(app.name) === slugify(name)))
}

export async function removeApp(name: string): Promise<string> {
  const index = apps.findIndex(app => app.name === name);
  apps.splice(index, 1);
  return fakeRequest('');
}

export async function toggleAppStatus(name: string): Promise<App | undefined> {
  const app = apps.find(app => app.name === name);

  if (app && app.status === 'active') {
    app.status = 'suspended';
  } else if (app && app.status === 'suspended') {
    app.status = 'active';
  }

  return fakeRequest(app);
}
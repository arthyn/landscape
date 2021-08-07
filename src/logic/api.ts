import { apps } from "./mock-data";

export type AppStatus = 'active' | 'suspended';

export interface App {
  name: string;
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

export async function getApps(): Promise<App[]> {
  return fakeRequest(apps);
}

export async function getApp(name: string): Promise<App | undefined> {
  return fakeRequest(apps.find(app => app.name === name))
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
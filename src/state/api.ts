import Urbit from '@urbit/http-api';
import { useMockData } from '../main';
const api = useMockData ? {
  poke: () => {},
  subscribe: () => {},
  subscribeOnce: () => {}
} : new Urbit('', '');
//  @ts-ignore todo window typings
api.ship = window.ship;
export default api;

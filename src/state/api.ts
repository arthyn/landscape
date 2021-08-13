import Urbit from '@urbit/http-api';
const api = import.meta.env.MODE === 'mock' ? {
  poke: () => {},
  subscribe: () => {},
  subscribeOnce: () => {}
} : new Urbit('', '');
//  @ts-ignore todo window typings
api.ship = window.ship;
export default api;

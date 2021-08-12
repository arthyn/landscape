import Urbit from '@urbit/http-api';
const api = new Urbit('', '');
//  @ts-ignore todo window typings
api.ship = window.ship;
export default api;

import _strava from "strava-v3";
import type { Strava } from 'strava-v3';
_strava.config({
  "access_token": '123',
  "client_id": "60205",
  "client_secret": "2c31cedcfe8d084d260828e8815a2c34179aa989",
  "redirect_uri": process.env.DOMAIN || '',
});

export const strava = (token: string) => {
  _strava.client(token);
  return _strava;
}
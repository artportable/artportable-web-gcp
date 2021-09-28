import { TokenPersistor } from "@react-keycloak/ssr/lib/persistors/types";
import type { AuthClientTokens } from '@react-keycloak/core';
import Cookie from 'js-cookie';
import { KeycloakTokenParsed } from "keycloak-js";

export var CustomSSRCookies = function (cookies) {
  return ({
    setTokens: (tokens: AuthClientTokens) => {
      if (tokens.idToken) {
        var decodedIdToken = decodeToken(tokens.idToken);
        setCookie('kcIdToken', encode(tokens.idToken), decodedIdToken.exp)
      }

      if (tokens.token) {
        var decodedToken = decodeToken(tokens.token);
        setCookie('kcToken', encode(tokens.token), decodedToken.exp)
      }

      if (tokens.refreshToken) {
        var decodedRefreshToken = decodeToken(tokens.refreshToken);
        setCookie('kcRefreshToken', encode(tokens.refreshToken), decodedRefreshToken.exp)
      }
    },
    getTokens: (): AuthClientTokens => {
      var tknStr = getCookie('kcToken', cookies);
      var idTknStr = getCookie('kcIdToken', cookies);
      var refreshTknStr = getCookie('kcRefreshToken', cookies);
      return {
        idToken: idTknStr ? decode(idTknStr) : '',
        refreshToken: refreshTknStr ? decode(refreshTknStr) : '',
        token: tknStr ? decode(tknStr) : '',
      };
    },
    resetTokens: () => {
      removeCookie('kcToken');
      removeCookie('kcIdToken');
      removeCookie('kcRefreshToken');
    },
  }) as TokenPersistor;
};
var isServer = function () { return typeof window === 'undefined'; };

function setCookie(name: string, val: string, exp: number) {
  var utcSeconds = exp;
  var date = new Date(0); // The 0 there is the key, which sets the date to the epoch
  date.setUTCSeconds(utcSeconds);

  return Cookie.set(name, val, {
    expires : date,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: 'strict'
  });
}
function getCookie(name: string, cookies: any) {
  if (cookies === void 0) { cookies = {}; }
  return isServer() ? cookies[name] : Cookie.get(name);
}
function removeCookie(name: string) {
  Cookie.remove(name);
}
function encode(value: string) {
  return Buffer.from(value).toString('base64');
}
function decode(value: string) {
  return Buffer.from(value, 'base64').toString();
}

function decodeToken(token: string): KeycloakTokenParsed {
  token = token.split('.')[1];

  token = token.replace(/-/g, '+');
  token = token.replace(/_/g, '/');

  token = decodeURIComponent(escape(Buffer.from(token, 'base64').toString()));

  var parsedToken = JSON.parse(token) as KeycloakTokenParsed;

  return parsedToken;
}
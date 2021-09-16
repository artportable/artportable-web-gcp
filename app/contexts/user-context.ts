import React from "react";
import { Membership } from '../models/Membership'

interface AsyncValue<T> {
  value: T;
  isPending: boolean;
}


export interface ContextUser {
  isSignedIn: AsyncValue<boolean>;
  profilePicture: AsyncValue<string>;
  username: AsyncValue<string>;
  membership: AsyncValue<Membership>;
}

export const defaultContextUser = {
  isSignedIn: {
    value: false,
    isPending: true,
  },
  profilePicture: {
    value: null,
    isPending: true,
  },
  username: {
    value: null,
    isPending: true,
  },
  membership: {
    value: null,
    isPending: false,
  }
}

export const UserContext = React.createContext<ContextUser>(defaultContextUser);
import React from "react";
import { Membership } from "../models/Membership";

interface AsyncValue<T> {
  value: T;
  isPending: boolean;
}

export interface ContextUser {
  isSignedIn: AsyncValue<boolean>;
  profilePicture: AsyncValue<string>;
  email: AsyncValue<string>;
  username: AsyncValue<string>;
  socialId: AsyncValue<string>;
  family_name: AsyncValue<string>;
  given_name: AsyncValue<string>;
  user_type: AsyncValue<string>;
  phone_number: AsyncValue<string>;
  phone: AsyncValue<string>;
  membership: AsyncValue<Membership>;
  isTyping: AsyncValue<boolean>;
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
  socialId: {
    value: null,
    isPending: true,
  },
  membership: {
    value: null,
    isPending: false,
  },
  family_name: {
    value: null,
    isPending: true,
  },
  given_name: {
    value: null,
    isPending: true,
  },
  user_type: {
    value: null,
    isPending: false,
  },
  phone_number: {
    value: null,
    isPending: false,
  },
  phone: {
    value: null,
    isPending: false,
  },
  email: {
    value: null,
    isPending: false,
  },
  isTyping: {
    value: false,
    isPending: true,
  },
};

export const UserContext = React.createContext<ContextUser>(defaultContextUser);

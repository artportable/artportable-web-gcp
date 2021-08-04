import Discover from "./Discover";
import User from "./User";
import { Store as ReduxStore } from 'redux'

export default interface Store extends ReduxStore{
  user: User;
  signup: object;
  discover: Discover;
}
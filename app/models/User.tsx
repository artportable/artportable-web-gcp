import { Membership } from "./Membership";

export default interface User {
  username: string;
  profilePicture: string;
  isSignedIn: boolean;
  membership: Membership;
}
import { useRouter } from "next/router";

export function useGetProfileUser() {
  const router = useRouter();
  const { username } = router.query;

  if (
    username === undefined ||
    username === null ||
    username.length < 1 ||
    typeof username !== "string"
  ) {
    return null;
  }

  if (String(username).startsWith("@")) {
    return String(username).substring(1);
  }

  return username;
}

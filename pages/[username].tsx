import { useRouter } from 'next/router'
import Main from '../app/components/Main/Main'


export default function Profile() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <Main>
      {username}
      <div>username</div>
    </Main>
  );
}
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'

import { styles } from './aboutMe.css'

export default function AboutMe({ userProfile }) {
  const s = styles();

  return (
    <Box className={s.container}>
      <Card>
        {userProfile.data.Headline}
      </Card>
    </Box>
  );
}
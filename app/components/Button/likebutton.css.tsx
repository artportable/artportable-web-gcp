import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    likeButton: {
      position: 'relative',
      // width: '24px',
      // height: '24px',
      '& svg': {
        color: 'white',
      },
    },
  })
)
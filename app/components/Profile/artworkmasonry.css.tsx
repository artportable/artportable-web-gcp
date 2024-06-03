import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      display: 'flex',
      flexFlow: 'row wrap',
    },
    masonryCardTwoOne: {
      width: '50%',
      height: '100px',
      marginBottom: 10,
      '&:nth-child(3n + 1)': {
        width: 'calc(50% - 5px)',
        height: 150,
        marginRight: 5,
      },
      '&:nth-child(3n + 2)': {
        width: 'calc(50% - 5px)',
        height: 150,
        marginLeft: 5,
      },
      '&:nth-child(3n)': {
        width: '100%',
        height: 300,
      },
    },
    masonryCardImage: {
      flexGrow: 1,
    },
    masonryCardSameSize: {
      width: '50%',
      height: '100px',
      marginBottom: 10,
      '&:nth-child(2n + 1)': {
        width: 'calc(50% - 5px)',
        height: 150,
        marginRight: 5,
      },
      '&:nth-child(2n + 2)': {
        width: 'calc(50% - 5px)',
        height: 150,
        marginLeft: 5,
      },
    },
    masonryCard3: {
      width: '100%',
      height: 200,
    },
    masonryCard4: {
      width: '100%',
    },
    dummy: {
      marginTop: '100%',
    }
  })
);
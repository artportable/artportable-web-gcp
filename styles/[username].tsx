import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const profileStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileCoverPhoto: {
      position: 'absolute',
      top: 'var(--header-height)',
      width: '100vw',
      height: '300px',
    },
    profileGrid: {
      display: 'grid',
      gap: '16px',
      gridTemplate: (
      '\"      .              .         .        .              .\"       185px' +
      '\"      .              .      profile     .              .\"       auto' +
      '\"      .              .         .        .              .\"       1fr' +
      '/ minmax(0, 2fr) minmax(0, 2fr) 2fr minmax(0, 2fr) minmax(0, 2fr)'),
    },
    profileSummary: {
      gridArea: 'profile'
    }
  }),
);
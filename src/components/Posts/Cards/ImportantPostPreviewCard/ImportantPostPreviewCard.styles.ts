import { makeStyles, Theme } from '@material-ui/core';

interface IStyleProps {
  backgroundImageUrl: string;
  size: 'small' | 'mobile' | 'large';
}

const sizeModes = {
  mobile: {
    root: {
      height: 'calc(100vh - 200px)',
      padding: [0],
    },
  },
  small: {
    root: {
      height: 200,
      padding: [6],
    },
    title: {
      marginBottom: [3],
      fontSize: '16px',
      lineHeight: '30px',
    },
    preview: {
      fontSize: '10px',
      lineHeight: '12px',
    },
    authorsDetails: {
      marginBottom: [2],
    },
    authorsName: {
      fontSize: '10px',
      lineHeight: '13px',
    },
  },
  large: {
    root: {
      height: 455,
      padding: [14, 5, 11, 11],
    },
    title: {
      marginBottom: [5],
      fontSize: '40px',
      lineHeight: '50px',
    },
    preview: {
      fontSize: '16px',
      lineHeight: '22px',
    },
    authorsDetails: {
      marginBottom: [7],
    },
    authorsName: {
      fontSize: '20px',
      lineHeight: '23px',
    },
  },
};

export const useStyles = makeStyles<Theme, IStyleProps>(
  (theme) => ({
    root: (props) => ({
      height: sizeModes[props.size].root.height,
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(
        ...(sizeModes[props.size].root.padding as [number]),
      ),
      backgroundImage: `url(${props.backgroundImageUrl})`,
      backgroundSize: 'cover',
      cursor: 'pointer',
      color: theme.palette.common.white,
    }),
  }),
  {
    name: 'ImportantPostPreviewCard',
  },
);

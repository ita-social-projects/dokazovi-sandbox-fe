import { TypographyOptions } from '@material-ui/core/styles/createTypography';

export const TYPOGRAPHY: TypographyOptions = {
  htmlFontSize: 16,
  fontFamily: [
    'Literata',
    'Raleway',
    'Montserrat',
    'Lato',
    'IBM Plex Serif',
    'Helvetica',
    'Roboto',
    'sans-serif',
  ].join(','), // Roboto is used for testing
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '48px',
    lineHeight: '54px',
  },
  h2: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '22px',
    lineHeight: '26px',
  },
  h3: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '24px',
  },
  h4: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '24px',
  },
  h5: {
    fontFamily: 'IBM Plex Serif',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
  },
  h6: {
    fontFamily: 'Lato',
    fontWeight: 500,
    fontSize: '10px',
    lineHeight: '12px',
  },
  body1: {
    fontFamily: 'Raleway',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '18px',
  },
  body2: {
    fontFamily: 'Raleway',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '26px',
  },
  button: {
    fontFamily: 'Raleway',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '18px',
  },
  caption: {
    fontFamily: 'Lato',
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '17px',
  },
  subtitle1: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: '10px',
    lineHeight: '12px',
    letterSpacing: '0.2em',
  },
  subtitle2: {
    fontFamily: 'Literata',
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: '13px',
    lineHeight: '18px',
  },
};

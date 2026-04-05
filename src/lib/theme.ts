
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h1: {
      fontWeight: 700,
      lineHeight: 1.2,
      fontSize: '48px',
      color: '#000000',
    },
    h2: {
      fontWeight: 700,
      lineHeight: 1.3,
      fontSize: '40px',
      color: '#000000',
    },
    h3: {
      fontWeight: 600,
      lineHeight: 1.4,
      fontSize: '32px',
      color: '#000000',
    },
    h4: {
      fontWeight: 600,
      lineHeight: 1.4,
      fontSize: '28px',
      color: '#000000',
    },
    h5: {
      fontWeight: 500,
      lineHeight: 1.5,
      fontSize: '24px',
      color: '#000000',
    },
    h6: {
      fontWeight: 500,
      lineHeight: 1.5,
      fontSize: '20px',
      color: '#000000',
    },
    body1: {
      fontWeight: 400,
      lineHeight: 1.6,
      fontSize: '16px',
      color: '#000000',
    },
    body2: {
      fontWeight: 400,
      lineHeight: 1.6,
      fontSize: '14px',
      color: '#000000',
    },
    subtitle1: {
      fontWeight: 500,
      lineHeight: 1.6,
      fontSize: '16px',
      color: '#000000',
    },
    subtitle2: {
      fontWeight: 500,
      lineHeight: 1.6,
      fontSize: '14px',
      color: '#000000',
    },
    caption: {
      fontWeight: 400,
      lineHeight: 1.4,
      fontSize: '12px',
      color: '#000000',
    },
    overline: {
      fontWeight: 400,
      lineHeight: 1.4,
      fontSize: '10px',
      color: '#000000',
    },
    button: {
      fontWeight: 600,
      lineHeight: 1.75,
      fontSize: '14px',
      color: '#000000',
    },
  },
  palette: {
    primary: {
      main: '#006BFF',
    },
    secondary: {
      main: '#77CDFF',
      light: '#EDF4FF',
    },
    text: {
      primary: '#000000',
      secondary: '#9e9e9e',
    },
    common: {
      white: '#FFFFFF',
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',

          // boxShadow: '0 0 24px 2px rgba(0, 0, 0, 0.1)',
          boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },

  }
});

export default theme;

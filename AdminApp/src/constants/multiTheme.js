import { createMuiTheme } from '@material-ui/core/styles';
import { blue, green, amber, red } from '@material-ui/core/colors';
import tc from './themeConstants';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { NonceProvider } from 'react-select';
const theme = createMuiTheme({
  direction: 'rtl',
  textAlign: "right",

  fontFamily: "isw",
  overrides: {

    MuiButtonBase: {

      "&$disabled": {
        "color": "rgb(255, 255, 255) !important",
        "boxShadow": "none",
        "backgroundColor": "rgba(7, 71, 95, 0.7) !important"
      }



    },


    MuiGrid: {
      item: {
        // padding: "1px 4px !important"
      }
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: lightBlue.A200,
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: 'white',
      },
    },
    MuiPickersSlideTransition: {
      transitionContainer: {
        '&p': {
          fontFamily: "isw",

        }

      }
    },

    MuiMenuItem: {
      root: {
        fontFamily: 'isw',
        fontSize: 10
      },
    },

    MuiTypography: {
      body: {
        fontFamily: "isw",

      },



      subheading: {
        fontSize: "0.7rem"
      },

      body1: {
        fontFamily: "isw",

      },
      caption: {
        fontFamily: "isw",

      },

    },
    MuiFormLabel: {
      root: {
        fontFamily: "isw",


      },
      filled: {
        fontFamily: "isw",

      },
      fromControl: {
        fontFamily: "isw",



      }
    },
    MuiInputBase: {

      input: {
        fontFamily: "isw",
      },

    },
    MuiFormControl: {
      root: {
        margin: "8px .15rem",

      }
    },
    MuiIconButton: {

      root: {

        padding: 0
      }
    },
    MuiFormControlLabel: {
      root: {
        marginLeft: "0 !important",
        fontSize: "13px"
      }
    },
    MuiSvgIcon: {
      root: {
        fontSize: "20px",
      }
    },
    MuiExpansionPanel: {
      root: {
        backgroundColor: "whitesmoke",
        margin: "-1px !important"
      }
    },
    MuiExpansionPanelSummary: {
      content: {
        expanded: {
          margin: 0
        },
        margin: "0 !important"
      },
      root: {
        minHeight: "33px !important"
      },

    },

    MuiFormHelperText: {
      error: {
        color: "#f44336",
        fontFamily: "isw",
        fontSize: "11px"

      },
      MuiToolbar: {
        root: {
          height: "55px !important",
          minHeight: "55px !important"
        }
      },



    },
    MuiAvatar: {
      root: {
        fontFamily: 'isw',
        width: 32,
        height: 32
      },
      colorDefault: {
        backgroundColor: "#2196f3"
      },
      img: {
        height: "auto"
      }

    },
    MuiButton: {
      "&$disabled": {
        "opacity": 0.5,

      }
    },
    MuiCard: {
      root: {
        margin: "1em"
      }
    }

  },

  palette: {
    primary: blue,
    secondary: green,
    success: green,
    warning: amber,
    danger: red,
    theme: tc.blueThem,
    dark: "#37474f",
    white: "white",

    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: lightBlue.A200,
        },
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
          // backgroundColor: lightBlue.A200,
          // color: 'white',
        },
      },
      MuiPickersDay: {
        day: {
          color: lightBlue.A700,
        },
        selected: {
          backgroundColor: lightBlue['400'],
        },
        current: {
          color: lightBlue['900'],
        },
      },
      MuiPickersModal: {
        dialogAction: {
          color: lightBlue['400'],
        },
      },


    },
  },
});
export default theme;
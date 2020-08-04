import '../node_modules/jquery/dist/jquery';
import '../node_modules/popper.js/dist/esm/popper';
import '../node_modules/bootstrap/dist/js/bootstrap';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { MuiThemeProvider } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// initialize provider for all application
import MyContextProvider from './store/contextProvider/provider';
// initialize provider for all application
import toastr from 'toastr';
import { createStore } from 'redux'
import combineReducers from './store/reducers/'
import { Provider } from 'react-redux';
import { create } from 'jss';
import rtl from 'jss-rtl';
import Login from './containers/login/login'
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider , createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import theme from 'constants/multiTheme'
import JalaliUtils from 'thirdParty/JalaliUtils'
import jMoment from 'thirdParty/JMoment';
import './utils/fonts/isw.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './utils/styles/tostr.css';
import './utils/styles/tooltip.css';
import './utils/styles/style.css';
import './styles/index.css';
import './styles/print.css';
import './styles/prism.css';
import './styles/normalize.css';
import './styles/fuse-helpers.css';
import '../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import '../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
const store = createStore(combineReducers);
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name g  enerator.
const generateClassName = createGenerateClassName();


toastr.options = {
  "positionClass": "toast-bottom-left"
}
// initialize provider for all application

class Index extends Component {

  render() {

    return (
      <MyContextProvider>
        <JssProvider jss={jss} generateClassName={generateClassName}>
          <Provider store={store}>
            <MuiThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa" moment={jMoment}>
                <BrowserRouter>
                  <Switch>
                    <Route exact path="/">
                      <Redirect to='/login' />
                    </Route>
                    <Route path="/login" component={Login} />
                    <Route path='/main' component={App} />
                  </Switch>
                </BrowserRouter>
              </MuiPickersUtilsProvider>
            </MuiThemeProvider>
          </Provider>
        </JssProvider>
      </MyContextProvider>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
serviceWorker.unregister();

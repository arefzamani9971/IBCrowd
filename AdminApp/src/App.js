import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToken, setEnum, setUserInfo } from './store/actions';
import Panel from './containers/layout/panel/panel';
import { SetToken } from 'core/axiosHelper';
import GetUserInformationService from './services/GetUserInformation';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import SignalRHelper from 'core/signalRHelper';

class Application extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isSidebarActive: false,
      userTitle: '',
      auth: '',
      location: ''
    };

    this.getUserInformation = this.getUserInformation.bind(this);

  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({ location: location });
    });

  }

  componentWillUnmount() {
    this.unlisten();
  }

  componentDidMount() {
    this.setState({
      location: this.props.history.location
    })
    var auth = JSON.parse(localStorage.getItem('authentication'));
    if (auth && auth != '') {
      this.setState({ auth: auth });
      SetToken(auth);
      this.props.setToken(auth);
      // this.getUserInformation();
    }
  }

  getUserInformation() {
    GetUserInformationService.getUserInformation(null, response => {
      if (response.success) {
        this.props.setUserInfo(response.result);
      }
    });
  }

  render() {
    return this.state.auth ? (
      <Panel location={this.state.location} history={this.props.history} />
    ) : (
        ''
      );
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.accessToken,
    sideBarMenu: state.sideBarMenu
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setToken: data => dispatch(setToken(data)),
    SetEnum: data => dispatch(setEnum(data)),
    setUserInfo: data => dispatch(setUserInfo(data))
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(Application);
export default App;

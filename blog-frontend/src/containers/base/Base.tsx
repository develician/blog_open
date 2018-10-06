import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { authActions } from 'store/modules/auth';
import { State } from 'store/modules';
import { withRouter } from 'react-router-dom';
import Nanobar from 'components/common/Nanobar';

export interface BaseProps {
  AuthActions: typeof authActions;
  history: any;
}

class Base extends React.Component<BaseProps> {
  public componentDidMount() {
    this.check();
    this.listenHistory();
  }

  public check = async () => {
    const logged = localStorage.getItem('logged');
    if (!logged || logged !== 'logged') {
      localStorage.removeItem('logged');
      return;
    }

    const { AuthActions } = this.props;
    AuthActions.setLogged();
    try {
      await AuthActions.check();
    } catch (e) {
      localStorage.removeItem('logged');
    }
  };

  public listenHistory = () => {
    const { history } = this.props;
    history.listen((location, type) => {
      (window as any).nanobar.go(100);
    });
  };
  public render() {
    return <Nanobar />;
  }
}

export default compose(
  withRouter,
  connect(
    ({ auth }: State) => ({}),
    dispatch => ({
      AuthActions: bindActionCreators(authActions, dispatch),
    })
  )
)(Base);

import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
  ListPage,
  AdminBigDoor,
  EditorPage,
  PostDetail,
  Management,
  Introduction,
  NotFound,
} from 'pages';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { authActions } from 'store/modules/auth';
import { State } from 'store/modules';
import Base from 'containers/base/Base';
// import Base from 'containers/base/Base';

interface AppProps {
  AuthActions: typeof authActions;
  history: any;
}

class App extends React.Component<AppProps> {
  public componentDidMount() {
    this.check();
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
  public render() {
    return (
      <div>
        <Switch>
          <Route exact={true} path="/" component={ListPage} />
          <Route exact={true} path="/temporary" component={ListPage} />
          <Route exact={true} path="/category" component={Management} />
          <Route path="/page/:page" component={ListPage} />
          <Route path="/tag/:tag/:page?" component={ListPage} />
          <Route path="/category/:category/:page?" component={ListPage} />
          <Route exact={true} path="/admin" component={AdminBigDoor} />
          <Route path="/editor" component={EditorPage} />
          <Route path="/post/:id" component={PostDetail} />
          <Route exact={true} path="/introduction" component={Introduction} />>
          <Route component={NotFound} />
        </Switch>
        <Base />
      </div>
    );
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
)(App);

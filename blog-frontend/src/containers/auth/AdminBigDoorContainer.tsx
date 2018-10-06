import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { authActions, Input } from 'store/modules/auth';
import { State } from 'store/modules';
import AdminLoginWrapper from 'components/admin/AdminLoginWrapper';
import AdminLoginForm from 'components/admin/AdminLoginForm';
import { withRouter } from 'react-router-dom';

export interface AdminBigDoorContainerProps {
  input: Input;
  AuthActions: typeof authActions;
  history: any;
}

class AdminBigDoorContainer extends React.Component<AdminBigDoorContainerProps> {
  public handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { AuthActions } = this.props;
    AuthActions.changeInput({ name: e.target.name, value: e.target.value });
  };

  public handleLogin = async () => {
    const { AuthActions, input, history } = this.props;

    try {
      await AuthActions.login({ username: input.username, password: input.password });
      localStorage.setItem('logged', 'logged');
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  public render() {
    const { username, password } = this.props.input;
    return (
      <AdminLoginWrapper>
        <AdminLoginForm
          username={username}
          password={password}
          onChangeInput={this.handleChangeInput}
          onLogin={this.handleLogin}
        />
      </AdminLoginWrapper>
    );
  }
}

export default compose(
  withRouter,
  connect(
    ({ auth }: State) => ({
      input: auth.input,
    }),
    dispatch => ({
      AuthActions: bindActionCreators(authActions, dispatch),
    })
  )
)(AdminBigDoorContainer);

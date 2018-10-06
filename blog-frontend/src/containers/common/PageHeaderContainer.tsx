import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { authActions } from 'store/modules/auth';
import { baseActions } from 'store/modules/base';
import { State } from 'store/modules';
import { withRouter } from 'react-router-dom';
import PageHeader from 'components/common/PageHeader';

export interface PageHeaderContainerProps {
  AuthActions: typeof authActions;
  BaseActions: typeof baseActions;
  logged: boolean;
  match: any;
  history: any;
}

class PageHeaderContainer extends React.Component<PageHeaderContainerProps> {
  public handleLogout = async () => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.logout();
      localStorage.removeItem('logged');
      window.location.href = '/';
    } catch (e) {
      console.log(e);
    }
  };

  public handleRemove = async () => {
    const { BaseActions } = this.props;
    BaseActions.showModal('remove');
  };

  public render() {
    const { logged } = this.props;
    const { id } = this.props.match.params;
    if (!logged) return null;
    return (
      <PageHeader
        onRemove={this.handleRemove}
        postId={id}
        logged={logged}
        onLogout={this.handleLogout}
      />
    );
  }
}

export default compose(
  withRouter,
  connect(
    ({ auth }: State) => ({
      logged: auth.logged,
    }),
    dispatch => ({
      AuthActions: bindActionCreators(authActions, dispatch),
      BaseActions: bindActionCreators(baseActions, dispatch),
    })
  )
)(PageHeaderContainer);

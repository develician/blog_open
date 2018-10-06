import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import NotFound from 'components/common/NotFound';

export interface NotFoundContainerProps {
  history: any;
}

class NotFoundContainer extends React.Component<NotFoundContainerProps> {
  public handleGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  public render() {
    return <NotFound onGoBack={this.handleGoBack} />;
  }
}

export default compose(
  withRouter,
  connect(
    () => ({}),
    () => ({})
  )
)(NotFoundContainer);

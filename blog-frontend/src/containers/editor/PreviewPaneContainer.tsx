import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { State } from 'store/modules';
import PreviewPane from 'components/editor/PreviewPane';

export interface PreviewPaneContainerProps {
  title: string;
  markdown: string;
  pending: boolean;
  logged: boolean;
}

class PreviewPaneContainer extends React.Component<PreviewPaneContainerProps> {
  public render() {
    const { title, markdown } = this.props;
    if (!this.props.logged || this.props.pending) {
      return null;
    }
    return <PreviewPane title={title} markdown={markdown} />;
  }
}

export default compose(
  withRouter,
  connect(
    ({ editor, pender, auth }: State) => ({
      title: editor.title,
      markdown: editor.markdown,
      pending: pender.pending['auth/CHECK'],
      logged: auth.logged,
    }),
    dispatch => ({})
  )
)(PreviewPaneContainer);

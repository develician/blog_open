import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { baseActions, VisibleType } from 'store/modules/base';
import { postActions } from 'store/modules/post';
import { categoryActions } from 'store/modules/category';
import { State } from 'store/modules';
import { withRouter } from 'react-router-dom';
import AskRemoveModal from 'components/modal/AskRemoveModal';

export interface AskRemoveModalContainerProps {
  BaseActions: typeof baseActions;
  PostActions: typeof postActions;
  CategoryActions: typeof categoryActions;
  visible: VisibleType;
  match: any;
  history: any;
  selectedId: string;
}

class AskRemoveModalContainer extends React.Component<AskRemoveModalContainerProps, any> {
  public handleCancel = what => {
    const { BaseActions } = this.props;

    BaseActions.hideModal(what);
  };

  public handleRemove = async what => {
    const { PostActions, BaseActions, CategoryActions, match, history, selectedId } = this.props;

    try {
      if (what === 'remove') {
        await PostActions.removePost({ id: match.params.id });
        BaseActions.hideModal(what);
        history.push('/');
      }

      if (what === 'category') {
        await CategoryActions.removeCategory(selectedId);
        BaseActions.hideModal(what);
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };
  public render() {
    const { remove, category } = this.props.visible;

    if (remove) {
      return (
        <AskRemoveModal
          visible={remove}
          onCancel={this.handleCancel}
          onConfirm={this.handleRemove}
          what={'remove'}
        />
      );
    }

    if (category) {
      return (
        <AskRemoveModal
          visible={category}
          onCancel={this.handleCancel}
          onConfirm={this.handleRemove}
          what={'category'}
        />
      );
    }

    return null;
  }
}

export default compose(
  withRouter,
  connect(
    ({ base, category }: State) => ({
      visible: base.visible,
      selectedId: category.selectedId,
    }),
    dispatch => ({
      BaseActions: bindActionCreators(baseActions, dispatch),
      PostActions: bindActionCreators(postActions, dispatch),
      CategoryActions: bindActionCreators(categoryActions, dispatch),
    })
  )
)(AskRemoveModalContainer);

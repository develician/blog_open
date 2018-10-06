import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { baseActions } from 'store/modules/base';
import { categoryActions } from 'store/modules/category';
import { State } from 'store/modules';
import { withRouter } from 'react-router-dom';
import AddCategoryModal from 'components/modal/AddCategoryModal';

export interface AddCategoryModalContainerProps {
  visible: boolean;
  categoryname: string;
  BaseActions: typeof baseActions;
  CategoryActions: typeof categoryActions;
}

class AddCategoryModalContainer extends React.Component<AddCategoryModalContainerProps> {
  public handleCancel = () => {
    const { BaseActions } = this.props;

    BaseActions.hideModal('addCategory');
  };

  public handleConfirm = async () => {
    const { CategoryActions, categoryname } = this.props;

    try {
      await CategoryActions.addCategory({ category: categoryname });
    } catch (e) {
      console.log(e);
    }
  };

  public handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { CategoryActions } = this.props;
    CategoryActions.changeCategoryname(e.target.value);
  };

  public render() {
    return (
      <AddCategoryModal
        visible={this.props.visible}
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm}
        onChangeInput={this.handleChangeInput}
      />
    );
  }
}

export default compose(
  withRouter,
  connect(
    ({ base, category }: State) => ({
      visible: base.visible.addCategory,
      categoryname: category.categoryname,
    }),
    dispatch => ({
      BaseActions: bindActionCreators(baseActions, dispatch),
      CategoryActions: bindActionCreators(categoryActions, dispatch),
    })
  )
)(AddCategoryModalContainer);

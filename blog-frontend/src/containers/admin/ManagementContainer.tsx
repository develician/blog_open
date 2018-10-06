import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { baseActions } from 'store/modules/base';
import { categoryActions, Category } from 'store/modules/category';
import { State } from 'store/modules';
import { withRouter } from 'react-router-dom';
import CategoryManagement from 'components/admin/CategoryManagement';
import AskRemoveModalContainer from 'containers/modal/AskRemoveModalContainer';
import AddCategoryModalContainer from 'containers/modal/AddCategoryModalContainer';
import { DragDropContext } from 'react-beautiful-dnd';

export interface ManagementContainerProps {
  BaseActions: typeof baseActions;
  CategoryActions: typeof categoryActions;
  categories: Category[];
}

class ManagementContainer extends React.Component<ManagementContainerProps> {
  public componentDidMount() {
    this.getCategories();
  }

  public getCategories = async () => {
    const { CategoryActions } = this.props;

    try {
      await CategoryActions.categoryList();
    } catch (e) {
      console.log(e);
    }
  };

  public showModal = what => {
    const { BaseActions } = this.props;
    BaseActions.showModal(what);
  };

  public handleSelectCategory = id => {
    const { CategoryActions } = this.props;
    CategoryActions.selectCategory(id);
  };

  public handleDragEnd = async result => {
    const { CategoryActions, categories } = this.props;
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const sourceId = categories[source.index]._id;
    const destId = categories[destination.index]._id;

    try {
      CategoryActions.reorderCategoryTemp({ sourceId, destId });
      await CategoryActions.reorderCategory({ sourceId, destId });
    } catch (e) {
      console.log(e);
    }
  };

  public render() {
    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <CategoryManagement
            showModal={this.showModal}
            categories={this.props.categories}
            onSelectCategory={this.handleSelectCategory}
          />
        </DragDropContext>
        <AskRemoveModalContainer />
        <AddCategoryModalContainer />
      </React.Fragment>
    );
  }
}

export default compose(
  withRouter,
  connect(
    ({ category }: State) => ({
      categories: category.categories,
    }),
    dispatch => ({
      BaseActions: bindActionCreators(baseActions, dispatch),
      CategoryActions: bindActionCreators(categoryActions, dispatch),
    })
  )
)(ManagementContainer);

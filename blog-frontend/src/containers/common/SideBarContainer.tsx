import * as React from 'react';
import { connect } from 'react-redux';
// import { compose } from 'redux';
import { State } from 'store/modules';
// import { withRouter } from 'react-router-dom';
import SideBar from 'components/common/SideBar';
import { bindActionCreators } from 'redux';
import { authActions } from 'store/modules/auth';
import { baseActions } from 'store/modules/base';
import { categoryActions, Category } from 'store/modules/category';

export interface SideBarContainerProps {
  logged: boolean;
  menuBarVisible: boolean;
  categories: Category[];
  AuthActions: typeof authActions;
  BaseActions: typeof baseActions;
  CategoryActions: typeof categoryActions;
}

export interface SideBarOwnProps extends React.Props<any> {
  visible: boolean;
}

class SideBarContainer extends React.Component<SideBarContainerProps & SideBarOwnProps> {
  public componentDidMount() {
    this.getCategories();
  }

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

  public toggleMenuBar = () => {
    const { BaseActions, menuBarVisible } = this.props;
    if (menuBarVisible) {
      BaseActions.hideModal('menuBar');
      return;
    }
    BaseActions.showModal('menuBar');
  };

  public getCategories = async () => {
    const { CategoryActions } = this.props;

    try {
      await CategoryActions.categoryList();
    } catch (e) {
      console.log(e);
    }
  };

  public render() {
    return (
      <SideBar
        visible={this.props.visible}
        logged={this.props.logged}
        onLogout={this.handleLogout}
        onToggle={this.toggleMenuBar}
        menuBarVisible={this.props.menuBarVisible}
        categories={this.props.categories}
      />
    );
  }
}

export default connect(
  ({ auth, base, category }: State) => ({
    logged: auth.logged,
    menuBarVisible: base.visible.menuBar,
    categories: category.categories,
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    CategoryActions: bindActionCreators(categoryActions, dispatch),
  })
)(SideBarContainer);

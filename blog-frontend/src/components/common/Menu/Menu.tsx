import * as React from 'react';
import styles from './Menu.scss';
import * as classNames from 'classnames/bind';
import MenuItem from '../MenuItem';
import { Category } from 'store/modules/category';

const cx = classNames.bind(styles);

interface MenuProps {
  logged: boolean;
  visible: boolean;
  categories: Category[];
  onLogout(): void;
}

const Menu: React.SFC<MenuProps> = ({ logged, onLogout, visible, categories }) => {
  const categoryList = categories.map((category, i) => {
    return (
      <MenuItem key={category._id} to={`/category/${category.category}`}>
        {category.category}
      </MenuItem>
    );
  });

  const categoryListMobile = categories.map((category, i) => {
    return (
      <MenuItem key={category._id} to={`/category/${category.category}`} visible={!visible}>
        {category.category}
      </MenuItem>
    );
  });
  return (
    <div className={cx('Menu')}>
      <div className={cx('MenuItemPC')}>
        <MenuItem to={'/introduction'} key={`introduction`}>
          Who Am I?
        </MenuItem>
        {categoryList}
        {logged && [
          <MenuItem to={'/editor'} key={`editor`}>
            Editor
          </MenuItem>,
          <MenuItem to={'/category'} key={`category`}>
            Category 관리
          </MenuItem>,
          <MenuItem onClick={onLogout} key={`logout`}>
            Logout
          </MenuItem>,
        ]}
      </div>
      <div className={cx('MenuItemMobile', { hidden: !visible })}>
        <MenuItem to={'/introduction'} key={`introduction`}>
          Who Am I?
        </MenuItem>
        {categoryListMobile}
        {logged && [
          <MenuItem to={'/editor'} key={`editor`} visible={!visible}>
            Editor
          </MenuItem>,
          <MenuItem to={'/category'} key={`category`} visible={!visible}>
            Category 관리
          </MenuItem>,
          <MenuItem onClick={onLogout} key={`logout`} visible={!visible}>
            Logout
          </MenuItem>,
        ]}
      </div>
    </div>
  );
};

export default Menu;

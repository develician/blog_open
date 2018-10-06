import * as React from 'react';
import styles from './SideBar.scss';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Menu from '../Menu';
import * as FaBars from 'react-icons/lib/fa/bars';
import { Category } from 'store/modules/category';
import LogoImage from '../../../static/images/my-logo.png';

const cx = classNames.bind(styles);

interface SideBarProps {
  visible: boolean;
  logged: boolean;
  menuBarVisible: boolean;
  categories: Category[];
  onLogout(): void;
  onToggle(): void;
}

const SideBar: React.SFC<SideBarProps> = ({
  visible,
  logged,
  onLogout,
  onToggle,
  menuBarVisible,
  categories,
}) => (
  <div className={cx('SideBar')} style={{ display: visible ? 'block' : 'none' }}>
    <Link to={'/'} className={cx('Logo')}>
      <img src={LogoImage} />
    </Link>
    <div className={cx('BurgerWrapper')}>
      <FaBars className={cx('Hamburger')} onClick={onToggle} />
    </div>
    <Menu logged={logged} onLogout={onLogout} visible={menuBarVisible} categories={categories} />
  </div>
);

export default SideBar;

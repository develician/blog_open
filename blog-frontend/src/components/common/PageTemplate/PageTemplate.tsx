import * as React from 'react';
import styles from './PageTemplate.scss';
import * as classNames from 'classnames/bind';
// import PageFooter from '../PageFooter';
import SideBarContainer from 'containers/common/SideBarContainer';

const cx = classNames.bind(styles);

interface PageTemplateProps {
  sideBarVisible: boolean;
}

const PageTemplate: React.SFC<PageTemplateProps> = ({ children, sideBarVisible }) => {
  return (
    <div className={cx('PageTemplate')}>
      <SideBarContainer visible={true} />

      <div className={cx('ContentWrapper')}>
        <main>{children}</main>
        {/* <PageFooter /> */}
      </div>
    </div>
  );
};

export default PageTemplate;

import * as React from 'react';
import styles from './NotFound.scss';
import * as classNames from 'classnames/bind';
import Button from '../Button';

const cx = classNames.bind(styles);

interface NotFoundProps {
  onGoBack(): void;
}

const NotFound: React.SFC<NotFoundProps> = ({ onGoBack }) => {
  return (
    <div className={cx('NotFound')}>
      <div className={cx('Center')}>
        <div className={cx('Description')}>없는 페이지 입니다.</div>
        <div className={cx('BackButton')}>
          <Button theme="outline" onClick={onGoBack}>
            돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

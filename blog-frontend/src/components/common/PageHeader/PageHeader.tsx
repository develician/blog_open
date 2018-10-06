import * as React from 'react';
import styles from './PageHeader.scss';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '../Button';

const cx = classNames.bind(styles);

interface PageHeaderProps {
  logged: boolean;
  postId?: string;
  onLogout(): void;
  onRemove(): void;
}

const PageHeader: React.SFC<PageHeaderProps> = ({ postId, logged, onLogout, onRemove }) => {
  return (
    <div className={cx('PageHeader')}>
      <Link to="/" className={cx('Logo')}>
        killi8n's Blog
      </Link>
      {logged && (
        <div className={cx('Right')}>
          {postId ? (
            [
              <div key="update" className={cx('Button')}>
                <Button theme="outline" to={`/editor?id=${postId}`}>
                  수정하기
                </Button>
              </div>,
              <div key="remove" className={cx('Button')}>
                <Button key="remove" theme="outline" onClick={onRemove}>
                  삭제하기
                </Button>
              </div>,
            ]
          ) : (
            <div className={cx('Button')}>
              <Button theme="outline" to={`/editor`}>
                글 올리기
              </Button>
            </div>
          )}

          <div className={cx('Button')}>
            <Button theme="outline" to={`/temporary`}>
              임시저장글
            </Button>
          </div>
          <div className={cx('Button')}>
            <Button theme="outline" onClick={onLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageHeader;

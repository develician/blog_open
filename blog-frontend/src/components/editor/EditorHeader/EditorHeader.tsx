import * as React from 'react';
import styles from './EditorHeader.scss';
import * as classNames from 'classnames/bind';
import Button from '../../common/Button';

const cx = classNames.bind(styles);

interface EditorHeaderProps {
  isEdit: boolean;
  onGoBack(): void;
  onSubmit(): void;
  onSubmitTemporary(): void;
}

const EditorHeader: React.SFC<EditorHeaderProps> = ({
  isEdit,
  onGoBack,
  onSubmit,
  onSubmitTemporary,
}) => {
  return (
    <div className={cx('EditorHeader')}>
      <div className={cx('Back')}>
        <Button theme="outline" onClick={onGoBack}>
          뒤로가기
        </Button>
      </div>
      <div className={cx('Submit')}>
        <Button theme="outline" onClick={onSubmitTemporary}>
          임시 저장
        </Button>
        <Button theme="outline" onClick={onSubmit}>
          {isEdit ? '수정하기' : '작성하기'}
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;

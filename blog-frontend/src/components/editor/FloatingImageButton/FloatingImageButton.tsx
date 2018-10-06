import * as React from 'react';
import styles from './FloatingImageButton.scss';
import * as classNames from 'classnames/bind';
import ImageIcon from 'react-icons/lib/io/image';
import Tooltip from 'react-tooltip';

const cx = classNames.bind(styles);

interface FloatingImageButtonProps {
  onClick(): void;
}

const FloatingImageButton: React.SFC<FloatingImageButtonProps> = ({ onClick }) => (
  <React.Fragment>
    <div
      className={cx('FloatingImageButton')}
      data-tip="이미지 업로드"
      data-place="left"
      onClick={onClick}
    >
      <ImageIcon />
    </div>
    <Tooltip effect="solid" className="tooltip" />
  </React.Fragment>
);

export default FloatingImageButton;

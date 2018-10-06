import * as React from 'react';
import styles from './ModalWrapper.scss';
import * as classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface ModalWrapperProps {
  visible: boolean;
}

class ModalWrapper extends React.Component<ModalWrapperProps> {
  public render() {
    const { children, visible } = this.props;
    if (!visible) return null;
    return (
      <div>
        <div className={cx('GrayBackground')}>
          <div className={cx('ModalWrapper')}>
            <div className={cx('Modal')}>{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalWrapper;

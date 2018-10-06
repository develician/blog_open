import * as React from 'react';
import styles from './AskRemoveModal.scss';
import * as classNames from 'classnames/bind';
import ModalWrapper from '../ModalWrapper';
import Button from '../../common/Button';

const cx = classNames.bind(styles);

interface AskRemoveModalProps {
  visible: boolean;
  what: string;
  onCancel(what): void;
  onConfirm(what): void;
}

const AskRemoveModal: React.SFC<AskRemoveModalProps> = ({ visible, onCancel, onConfirm, what }) => {
  const handleCancel = () => {
    onCancel(what);
  };

  const handleConfirm = () => {
    onConfirm(what);
  };

  return (
    <ModalWrapper visible={visible}>
      <div className={cx('Question')}>
        <div className={cx('Title')}>삭제</div>
        <div className={cx('Description')}>삭제하시겠습니까?</div>
      </div>
      <div className={cx('Options')}>
        <Button theme="Gray" onClick={handleCancel}>
          취소
        </Button>
        <Button onClick={handleConfirm}>삭제</Button>
      </div>
    </ModalWrapper>
  );
};

export default AskRemoveModal;

import * as React from 'react';
import styles from './AddCategoryModal.scss';
import * as classNames from 'classnames/bind';
import ModalWrapper from '../ModalWrapper';
import Button from '../../common/Button';

const cx = classNames.bind(styles);

interface AddCategoryModalProps {
  visible: boolean;
  onCancel(): void;
  onConfirm(): void;
  onChangeInput(e: React.ChangeEvent<HTMLInputElement>): void;
}

const AddCategoryModal: React.SFC<AddCategoryModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  onChangeInput,
}) => (
  <ModalWrapper visible={visible}>
    <div className={cx('Question')}>
      <div className={cx('Title')}>카테고리 추가</div>
      <div className={cx('Input')}>
        <input
          type="text"
          name="categoryname"
          placeholder="추가할 카테고리 이름"
          onChange={onChangeInput}
        />
      </div>
    </div>
    <div className={cx('Options')}>
      <Button theme="Gray" onClick={onCancel}>
        취소
      </Button>
      <Button onClick={onConfirm}>추가</Button>
    </div>
  </ModalWrapper>
);

export default AddCategoryModal;

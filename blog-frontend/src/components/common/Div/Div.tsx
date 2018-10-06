import * as React from 'react';
import styles from './Div.scss';
import * as classNames from 'classnames/bind';

interface DivProps {
  theme: string;
  id?: string;
  disabled?: boolean;
  onClick?(): void;
}

const cx = classNames.bind(styles);

const Div: React.SFC<DivProps> = ({ children, theme, disabled, onClick, id }) => {
  return (
    <div
      id={id}
      className={cx('divButton', theme, { disabled })}
      onClick={disabled ? () => null : onClick}
    >
      {children}
    </div>
  );
};

export default Div;

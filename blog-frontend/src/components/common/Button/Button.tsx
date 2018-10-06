import * as React from 'react';
import styles from './Button.scss';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Div from '../Div';

interface ButtonProps {
  theme?: string;
  disabled?: boolean;
  to?: string;
  id?: string;
  onClick?(e?): void;
}

const cx = classNames.bind(styles);

const Button: React.SFC<ButtonProps> = ({
  children,
  to,
  onClick,
  disabled,
  theme = 'default',
  id,
}) => {
  if (to && !disabled) {
    return (
      <Link
        to={to}
        className={cx('button', theme, { disabled })}
        onClick={disabled ? () => null : onClick}
      >
        {children}
      </Link>
    );
  }
  return (
    <Div id={id} theme={theme} disabled={disabled} onClick={disabled ? () => null : onClick}>
      {children}
    </Div>
  );
};

export default Button;

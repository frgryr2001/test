import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import authStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
const Anchor = ({
  onClick,
  className,
  target,
  href,
  icon,
  iconClass,
  text,
  badge,
  arrow,
  children,
  ...rest
}) => {
  const navigate = useNavigate();
  if (text === 'logout') {
    return (
      <Link
        onClick={() => authStore.logout(navigate)}
        className={className}
        {...rest}
      >
        {icon || iconClass ? (
          <i className={iconClass || 'material-icons'}>{icon}</i>
        ) : (
          <></>
        )}
        {text && <span>{text}</span>}
        {badge && <sup className={badge.variant}>{badge.text}</sup>}
        {arrow && <small className="material-icons">{arrow}</small>}
        {children}
      </Link>
    );
  }

  return (
    <Link
      to={href || '#'}
      target={target}
      onClick={onClick}
      className={className}
      {...rest}
    >
      {icon || iconClass ? (
        <i className={iconClass || 'material-icons'}>{icon}</i>
      ) : (
        <></>
      )}
      {text && <span>{text}</span>}
      {badge && <sup className={badge.variant}>{badge.text}</sup>}
      {arrow && <small className="material-icons">{arrow}</small>}
      {children}
    </Link>
  );
};
export default observer(Anchor);

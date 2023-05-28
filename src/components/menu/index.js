import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from "react-router-dom";

function Menu({ title, href }) {
  const cn = bem('Menu');
  
  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        <li className={cn('item')}><Link to={href} className={cn('link')}>{title}</Link></li>
      </ul>
    </div>
  );
}

Menu.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
};

export default memo(Menu);

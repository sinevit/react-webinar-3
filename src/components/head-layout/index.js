import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function HeadLayout({ children }) {

  const cn = bem('HeadLayout');

  return (
    <div className={cn()}>
      {children}
    </div>
  );
}

HeadLayout.propTypes = {
  children: PropTypes.node
}

export default memo(HeadLayout);

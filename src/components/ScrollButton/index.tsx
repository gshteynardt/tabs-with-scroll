import { memo } from 'react';
import cn from 'classnames';

import './ScrollButton.scss';

interface Props {
  disabled?: boolean;
  direction: 'right' | 'left';
  onClick: () => void;
}

const ScrollButton = (props: Props) => {
  const { direction, disabled = false, onClick } = props;
  const componentClass = cn('ScrollButton', disabled && 'ScrollButton_disabled');

  return (
    <button
      className={componentClass}
      onClick={onClick}
    >
      {direction === 'left' ? '<' : '>' }
    </button>
  );
};

const areEqual = (prev: Props, next: Props) => prev === next;

export default memo(ScrollButton, areEqual);

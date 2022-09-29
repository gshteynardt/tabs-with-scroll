import React, { memo, ReactNode } from 'react';
import cn from 'classnames';

import ScrollButton from '../ScrollButton';
import useTabs from './useTabs';
import './Tabs.scss';

interface Props {
  children: ReactNode;
}

const Tabs = (props: Props) => {
  const { children } = props;

  const {
    active,
    tabListRef,
    setActive,
    disabledStartScroll,
    disabledEndScroll,
    handleStartScrollClick,
    handleEndScrollClick,
  } = useTabs();

  const labels = React.Children.map(children, (child: any, index) => {
    const label = child.props.label;

    return (
      <li
        key={label}
        className={
          cn(
            'Tabs__Label',
            index === active && 'Tabs__Label_active',
          )
        }
        onClick={() => setActive(index)}
      >
        {label}
      </li>
    );
  });

  const content = React.Children.map(children, (child: any, index) => index === active
    ? child
    : <div hidden>{child}</div>,
  );

  return (
    <div className="Tabs">
      <div className="Tabs__Root">
        <ScrollButton
          direction="left"
          onClick={handleStartScrollClick}
          disabled={disabledStartScroll}
        />
        <ul className="Tabs__Labels" ref={tabListRef}>
          {labels}
        </ul>
        <ScrollButton
          direction="right"
          onClick={handleEndScrollClick}
          disabled={disabledEndScroll}
        />
      </div>
      <div className="Tabs__Content">{content}</div>
    </div>
  );
};

const areEqual = (prev: Props, next: Props) => prev === next;

export default memo(Tabs, areEqual);

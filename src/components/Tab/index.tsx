import { memo, ReactNode } from 'react';

import './Tab.scss';

interface Props {
  children: ReactNode;
  label: ReactNode;
}

const Tab = (props: Props) => {
  const { children } = props;

  return (
    <div className="Tab">{children}</div>
  );
};

const areEqual = (prev: Props, next: Props) => prev === next;

export default memo(Tab, areEqual);

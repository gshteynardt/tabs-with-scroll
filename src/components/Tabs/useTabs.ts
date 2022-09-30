import { useState, useRef, useLayoutEffect, useCallback } from 'react';

const useTabs = () => {
  const [active, setActive] = useState<number>();
  const tabListRef = useRef<HTMLUListElement>(null);

  const [{ scrollLeft, clientWidth, scrollWidth }, setElemSize] = useState({
    scrollLeft: 0,
    scrollWidth: 0,
    clientWidth: 0,
  });

  const showStartScroll = scrollLeft > 0;
  const showEndScroll = scrollLeft < scrollWidth - clientWidth -1 && scrollLeft >= 0;

  const updateElemSize = useCallback(() => {
    if (!tabListRef.current) return;

    setElemSize({
      scrollWidth: tabListRef.current.scrollWidth,
      scrollLeft: tabListRef.current.scrollLeft,
      clientWidth: tabListRef.current.clientWidth,
    });
  }, [tabListRef.current?.scrollLeft, tabListRef.current?.scrollWidth]);

  useLayoutEffect(() => {
    updateElemSize();
  }, [updateElemSize]);

  const moveTabsScroll = (delta: number) => {
    if (!tabListRef.current) return;

    tabListRef.current.scrollLeft += delta;
  };

  const getScrollSize = () => {
    if (!tabListRef.current) return 0;

    const containerSize = clientWidth;
    let totalSize = 0;
    const children = Array.from(tabListRef.current.children);

    for (let i = 0; i < children.length; i++) {
      const tab = children[i];

      if (totalSize + tab.clientWidth > containerSize) {
        if (i === 0) {
          totalSize = containerSize;
        }
        break;
      }

      totalSize += tab.clientWidth;
    }

    return totalSize;
  };

  const handleStartScrollClick = () => {
    moveTabsScroll(-1 * getScrollSize());

    setTimeout(updateElemSize, 500);
  };

  const handleEndScrollClick = () => {
    moveTabsScroll(getScrollSize());

    setTimeout(updateElemSize, 500);
  };

  return {
    active,
    tabListRef,
    setActive,
    disabledStartScroll: !showStartScroll,
    disabledEndScroll: !showEndScroll,
    handleStartScrollClick,
    handleEndScrollClick,
  };
};

export default useTabs;

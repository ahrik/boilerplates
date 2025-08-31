import { CSSProperties, ReactNode, useRef } from 'react';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';

type Props<T> = {
  data: Array<T>;
  itemHeight: number;
  parentHeight: string | number;
  overscan?: number;
  renderItemClassname?: string;
  renderItemStyle?: CSSProperties;

  children: (virtualRow: VirtualItem, item: T) => ReactNode;
};

export const VirtualList = <T,>({
  data,
  itemHeight,
  overscan,
  parentHeight,
  children,
  renderItemClassname,
  renderItemStyle,
}: Props<T>) => {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: data?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: overscan || 5,
  });

  const items = rowVirtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      className="overflow-auto border rounded-xl"
      style={{ scrollbarColor: 'gray white', height: parentHeight }}
    >
      <ul className="relative w-full" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {items.map(virtualRow => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              className={renderItemClassname}
              style={renderItemStyle}
            >
              {children(virtualRow, data[virtualRow.index])}
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

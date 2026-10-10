import React from 'react';

export interface ScrollStackItemProps {
  children?: React.ReactNode;
  itemClassName?: string;
  style?: React.CSSProperties;
  key?: React.Key;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps>;

export interface ScrollStackProps {
  children?: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  baseScale?: number;
  onStackComplete?: () => void;
  onActiveIndexChange?: (index: number) => void;
}

declare const ScrollStack: React.ForwardRefExoticComponent<
  ScrollStackProps & React.RefAttributes<HTMLDivElement>
>;

export default ScrollStack;

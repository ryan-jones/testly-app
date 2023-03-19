import { Tooltip, TooltipProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface Props extends TooltipProps {
  label: ReactNode;
  children: ReactNode;
  shouldWrapChildren?: boolean;
  style?: any;
}
const InfoTooltip = ({
  label,
  children,
  shouldWrapChildren = true,
  style,
  ...rest
}: Props) => (
  <Tooltip
    {...rest}
    style={style}
    shouldWrapChildren
    hasArrow
    label={label}
    background="blue.500"
  >
    {children}
  </Tooltip>
);

export default InfoTooltip;

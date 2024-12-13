import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
  isLoading?: boolean;
}

const Button: React.FC<Props> = ({ isLoading, children, ...props }) => (
  <MuiButton {...props} disabled={isLoading || props.disabled}>
    {isLoading ? 'Loading...' : children}
  </MuiButton>
);

export default Button;

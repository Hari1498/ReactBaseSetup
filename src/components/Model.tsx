import React from 'react';
import { Modal as MuiModal, Box } from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => (
  <MuiModal open={open} onClose={onClose}>
    <Box sx={{ padding: 4, background: 'white', borderRadius: 2 }}>{children}</Box>
  </MuiModal>
);

export default Modal;

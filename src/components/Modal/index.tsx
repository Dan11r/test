import React, { VoidFunctionComponent } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'center',
  width: 'calc(100vw - 40%)',
  bgcolor: 'background.paper',
  outline: 'none',
  boxShadow: 24,
  p: 4,
}

interface ModalImgProps {
  handleClose: () => void
  open: boolean
  activeImgUrl: string
}

export const ModalImg: React.FC<ModalImgProps> = ({ handleClose, open, activeImgUrl }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <img style={{ maxWidth: '100%' }} src={activeImgUrl} alt="largeimage" />
          <Box
            sx={{ position: 'absolute', right: '20px', top: '20px', cursor: 'pointer' }}
            onClick={handleClose}>
            X
          </Box>
        </Box>
      </Modal>
    </>
  )
}

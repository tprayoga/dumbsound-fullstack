import { Box, Button, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Addartis from '../pages/Addartis'
import Addmusic from '../pages/Addmusic'
import Home from '../pages/Home'
import Pay from '../pages/Pay'
import Transactions from '../pages/Transactions'
import MessageIcon from '@mui/icons-material/Message';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Routers = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/pay' element={<Pay/>}/>
      <Route path='/add-music' element={<Addmusic/>}/>
      <Route path='/add-artis' element={<Addartis/>}/>
      <Route path='/transaction' element={<Transactions/>}/>
    </Routes>
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Chat
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
    </>
  )
}

export default Routers
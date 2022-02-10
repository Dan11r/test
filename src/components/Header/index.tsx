import React from 'react'

import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

export const Header: React.FC = () => {
  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            Тестовое задание
          </Typography>
        </Container>
      </AppBar>
    </>
  )
}

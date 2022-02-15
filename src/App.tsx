import React, { useState, useEffect } from 'react'

import { api } from './api'

import Container from '@mui/material/Container'

import { ModalImg } from './components/Modal'
import { Cards } from './components/Cards'
import { NavSection } from './components/NavSection'
import { Header } from './components/Header'

import { usePagination } from './hooks/usePagination'

import { SelectChangeEvent } from '@mui/material/Select'

const baseUrl = 'https://jsonplaceholder.typicode.com/'

export interface ImageItem {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

const App: React.FC = () => {
  const pagination = usePagination(baseUrl)

  const [open, setOpen] = useState(false) //- modal
  const [activeImgUrl, setActiveImgUrl] = useState<string>('') //- url for modal image

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  function onImgClick(url: string) {
    setActiveImgUrl(url)
    handleOpen()
  }

  function handleChange(event: SelectChangeEvent) {
    pagination.setAlbumId(event.target.value as string)
    pagination.setCurrentPage(1)
  }

  return (
    <>
      <Header />
      <Container sx={{ mt: 3 }}>
        <NavSection
          totalPages={pagination.totalPages}
          currentPage={pagination.currentPage}
          setCurrentPage={pagination.setCurrentPage}
          albumId={pagination.albumId}
          handleChange={handleChange}
        />
        <Cards
          isloading={pagination.isloading}
          setIsloading={pagination.setIsloading}
          setImages={pagination.setImages}
          images={pagination.images}
          onImgClick={onImgClick}
        />
      </Container>

      {!!pagination.images && (
        <ModalImg open={open} activeImgUrl={activeImgUrl} handleClose={handleClose} />
      )}
    </>
  )
}

export default App

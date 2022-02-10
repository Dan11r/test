import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Container from '@mui/material/Container'

import { ModalImg } from './components/Modal'
import { Cards } from './components/Cards'
import { NavSection } from './components/NavSection'
import { Header } from './components/Header'

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
  const [images, setImages] = useState<ImageItem[]>([])
  const [isloading, setIsloading] = useState<boolean>(true)
  const [totalImages, setTotalImages] = useState(0)
  const [pageSize, setPageSize] = useState(25)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [albumId, setAlbumId] = useState<string>('0') // - current albumId for axios request (0 == all albums)

  const [open, setOpen] = useState(false) //- modal
  const [activeImgUrl, setActiveImgUrl] = useState<string>('') //- url for modal image

  useEffect(() => {
    getImages(currentPage)
  }, [albumId, currentPage])

  useEffect(() => {
    setTotalImages(albumId ? 50 : 5000)
  }, [albumId])

  useEffect(() => {
    let totalPages = totalImages / pageSize
    setTotalPages(totalPages)
  }, [pageSize, totalImages])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  function onImgClick(url: string) {
    setActiveImgUrl(url)
    handleOpen()
  }

  function handleChange(event: SelectChangeEvent) {
    setAlbumId(event.target.value as string)
    setCurrentPage(1)
  }

  async function getImages(page = 1, limit = 25) {
    setIsloading(true)
    let { data } = await axios.get(
      baseUrl +
        (albumId !== '0'
          ? `albums/${albumId}/photos?_page=${page}&_limit=${limit}`
          : `photos?_page=${page}&_limit=${limit}`),
    )
    setImages(data)
    setIsloading(false)
  }
  async function deleteImage(id: number) {
    console.log(id)
    if (window.confirm('вы точно хотите удалить это?')) {
      setIsloading(true)
      let { status } = await axios.delete(baseUrl + `photos/${id}`)
      setIsloading(false)
      if (status === 200) {
        setImages((prev) => [...prev].filter((e) => e.id != id))
        console.log('типа удалил')
      }
    }
  }

  return (
    <>
      <Header />
      <Container sx={{ mt: 3 }}>
        <NavSection
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          albumId={albumId}
          handleChange={handleChange}
        />
        <Cards
          isloading={isloading}
          deleteImage={deleteImage}
          images={images}
          onImgClick={onImgClick}
        />
      </Container>

      {!!images && <ModalImg open={open} activeImgUrl={activeImgUrl} handleClose={handleClose} />}
    </>
  )
}

export default App

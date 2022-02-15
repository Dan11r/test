import { useState, useEffect } from 'react'
import { ImageItem } from './../App'

import { api } from './../api'

export function usePagination(baseUrl: string) {
  const [images, setImages] = useState<ImageItem[]>([])
  const [isloading, setIsloading] = useState(true)
  const [totalImages, setTotalImages] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [albumId, setAlbumId] = useState<string>('0')

  const pageSize = 25

  useEffect(() => {
    api.getImages(currentPage, pageSize, albumId, setIsloading, setImages)
  }, [albumId, currentPage])

  useEffect(() => {
    setTotalImages(albumId !== '0' ? 50 : 5000)
  }, [albumId])

  useEffect(() => {
    let totalPages = totalImages / pageSize
    setTotalPages(totalPages)
  }, [pageSize, totalImages])

  return {
    images,
    setImages,
    isloading,
    setIsloading,
    totalPages,
    currentPage,
    setCurrentPage,
    albumId,
    setAlbumId,
  }
}

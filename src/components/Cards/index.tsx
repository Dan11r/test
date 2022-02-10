import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Skeleton from '@mui/material/Skeleton'

import { ImageItem } from './../../App'

interface CardsProps {
  images: ImageItem[]
  onImgClick: (url: string) => void
  deleteImage: (id: number) => Promise<void>
  isloading: boolean
}

export const Cards: React.FC<CardsProps> = ({ images, onImgClick, deleteImage, isloading }) => {
  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 20 }}>
        {!isloading
          ? images.map((e) => (
              <Card key={e.url} sx={{ width: 150, height: 150, m: 1, cursor: 'pointer' }}>
                <IconButton
                  onClick={() => deleteImage(e.id)}
                  sx={{ position: 'absolute', zIndex: '1' }}
                  aria-label="delete">
                  <DeleteIcon />
                </IconButton>
                <img onClick={() => onImgClick(e.url)} src={e.thumbnailUrl} alt="sdf" />
              </Card>
            ))
          : Array(25)
              .fill(1)
              .map((e) => (
                <Skeleton sx={{ m: 1 }} variant="rectangular" width={150} height={150} />
              ))}
      </Box>
    </>
  )
}

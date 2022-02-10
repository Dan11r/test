import React from 'react'

import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { SelectChangeEvent } from '@mui/material/Select'

interface NavSectionProps {
  totalPages: number
  currentPage: number
  setCurrentPage: (numPage: number) => void
  albumId: string
  handleChange: (event: SelectChangeEvent) => void
}

export const NavSection: React.FC<NavSectionProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
  albumId,
  handleChange,
}) => {
  return (
    <>
      <Box
        sx={{ position: 'fixed', left: 0, right: 0, top: 0, zIndex: 100, backgroundColor: '#fff' }}>
        <Box
          m={3}
          sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mt: 4 }}>
          <Pagination
            sx={{ display: 'flex', justifyContent: 'center', m: 1 }}
            count={totalPages}
            page={currentPage}
            onChange={(e, numPage) => setCurrentPage(numPage)}
            color="primary"
          />
          <FormControl sx={{ minWidth: 120, m: 1 }} variant="filled">
            <InputLabel id="demo-simple-select-label">альбом</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              placeholder="ergeg"
              id="demo-simple-select"
              value={albumId}
              label="albumId"
              onChange={handleChange}>
              <MenuItem value={'0'}>
                <em>Все</em>
              </MenuItem>
              {Array(100)
                .fill(1)
                .map((e, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </>
  )
}

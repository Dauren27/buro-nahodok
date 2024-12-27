import { Typography } from '@mui/material'
import React from 'react'

const CopyRight = (props) => {
    return (
        <a href='https://www.instagram.com/_dauren.altynbekov_/' target='_blank' rel='noreferrer' >

            <Typography variant="body1" fontWeight="bold" color="text.secondary" align="center" {...props} style={{ color: '#1976d2',  }}>
                {' '}
                {new Date().getFullYear()}
                {/* {'.'} */}
                {' © '}
                Developed By Dauren Altynbekov
            </Typography>
        </a>
    )
}

export default CopyRight
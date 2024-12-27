import { Typography } from '@mui/material'
import React from 'react'

const CopyRight = (props) => {
    return (
        <a href='https://png.klev.club/uploads/posts/2024-06/png-klev-club-kh3r-p-negr-lezhit-png-15.png' target='_blank' rel='noreferrer' >

            <Typography variant="body1" fontWeight="bold" color="text.secondary" align="center" {...props} style={{ color: '#1976d2',  }}>
                {' '}
                {new Date().getFullYear()}
                {/* {'.'} */}
                {' © '}
                Developed By Dauren Altynbekov & Ikramov Abdul
            </Typography>
        </a>
    )
}

export default CopyRight
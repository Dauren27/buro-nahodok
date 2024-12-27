import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import CommentCard from '../../../Components/Card/Comment Card/CommentCard';


const UserReviewItem = ({ commonGetRequest, id }) => {
    const [userReview, setUserReview] = useState([]);

    useEffect(() => {
        commonGetRequest(process.env.REACT_APP_ADMIN_GET_REVIEW, id, setUserReview);
    }, [])
    return (
        <>
            <Typography variant='h6' fontWeight="bold" sx={{ margin: '20px 0', textAlign: 'center' }}>Комментарий пользователя</Typography>
            {userReview.length < 1 && <Typography variant='h6' sx={{ margin: '40px 0', textAlign: 'center' }}>Пользователь не оставил никаких комментариев</Typography>}

            <Box className='review-box' sx={{ padding: 1.5 }} >
                {
                    userReview.map(review =>
                        <Box margin="30px 0">
                            <CommentCard userReview={review} key={review._id} />
                            <Link to={`/Detail/type/${review.productId.type}/${review.productId._id}`} key={review._id} style={{
                                color: "#1976d2"
                            }}>
                                <Typography textAlign="center" sx={{ color: "#1976d" }} >Перейти к публикации</Typography>  </Link>
                        </Box>
                    )
                }
            </Box>
        </>
    )
}

export default UserReviewItem
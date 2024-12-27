import "./Productsimilar.css";
import React, {useEffect, useState, useContext} from "react";
import {useParams, Link} from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Tooltip,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Chip,
    Rating,
    ButtonGroup,
    Skeleton,
    IconButton,
} from "@mui/material";
import {MdAddShoppingCart} from "react-icons/md";
import {
    AiFillHeart,
    AiFillCloseCircle,
    AiOutlineLogin,
    AiOutlineShareAlt,
} from "react-icons/ai";
import {TbDiscount2} from "react-icons/tb";
import axios from "axios";
import {toast} from "react-toastify";
import {ContextFunction} from "../../Context/Context";
import ProductReview from "../../Components/Review/ProductReview";
import ProductCard from "../../Components/Card/Product Card/ProductCard";
import {Transition, getSingleProduct} from "../../Constants/Constant";
import CopyRight from "../../Components/CopyRight/CopyRight";

const ProductDetail = () => {
    const {wishlistData, setWishlistData} = useContext(ContextFunction);
    const [openAlert, setOpenAlert] = useState(false);
    const {id, cat} = useParams();
    const [product, setProduct] = useState([]);
    const [similarProduct, setSimilarProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    let authToken = localStorage.getItem("Authorization");
    let setProceed = authToken ? true : false;

    useEffect(() => {
        getSingleProduct(setProduct, id, setLoading);
        getSimilarProducts();
        window.scroll(0, 0);
    }, [id]);

    const addToWhishList = async (product) => {
        if (setProceed) {
            try {
                const {data} = await axios.post(
                    `${process.env.REACT_APP_ADD_WISHLIST}`,
                    {_id: product._id},
                    {
                        headers: {
                            Authorization: authToken,
                        },
                    }
                );
                setWishlistData(data);
                setWishlistData([...wishlistData, product]);
                toast.success("Публикация добавлена в избранное", {
                    autoClose: 500,
                    theme: "colored",
                });
            } catch (error) {
                toast.error(error.response.data.msg, {
                    autoClose: 500,
                    theme: "colored",
                });
            }
        } else {
            setOpenAlert(true);
        }
    };

    const getSimilarProducts = async () => {
        const {data} = await axios.post(
            `${process.env.REACT_APP_PRODUCT_TYPE}`,
            {userType: cat}
        );
        setSimilarProduct(data);
    };
    let data = [];
    data.push(cat);

    return (
        <>
            <Container maxWidth="xl">
                <Dialog
                    open={openAlert}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setOpenAlert(false)}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent sx={{width: {xs: 280, md: 350, xl: 400}}}>
                        <DialogContentText
                            style={{textAlign: "center"}}
                            id="alert-dialog-slide-description"
                        >
                            Авторизуйтесь чтобы продолжить
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions
                        sx={{display: "flex", justifyContent: "space-evenly"}}
                    >
                        <Link to="/login">
                            {" "}
                            <Button
                                variant="contained"
                                endIcon={<AiOutlineLogin />}
                                color="primary"
                            >
                                Авторизиваться
                            </Button>
                        </Link>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setOpenAlert(false)}
                            endIcon={<AiFillCloseCircle />}
                        >
                            Отмена
                        </Button>
                    </DialogActions>
                </Dialog>

                <main className="main-content">
                    {loading ? (
                        <Skeleton variant="rectangular" height={400} />
                    ) : (
                        <div className="product-image">
                            <div className="detail-img-box">
                                <img
                                    alt={product.name}
                                    src={product.image}
                                    className="detail-img"
                                />
                                <br />
                            </div>
                        </div>
                    )}
                    {loading ? (
                        <section
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                width: "100%",
                                justifyContent: "space-around",
                                alignItems: "center",
                            }}
                        >
                            <Skeleton
                                variant="rectangular"
                                height={200}
                                width="200px"
                            />
                            <Skeleton variant="text" height={400} width={700} />
                        </section>
                    ) : (
                        <section className="product-details">
                            <Typography variant="h4">{product.name}</Typography>

                            <Typography>{product.description}</Typography>
                            <Typography>
                                <div className="chip">
                                    {data.map((item, index) => (
                                        <Chip
                                            label={item}
                                            key={index}
                                            variant="outlined"
                                        />
                                    ))}
                                </div>
                            </Typography>

                            <div style={{display: "flex"}}>
                                <Tooltip title="Добавить в избранное">
                                    <Button
                                        style={{marginLeft: 10}}
                                        size="small"
                                        variant="contained"
                                        className="all-btn"
                                        onClick={() => addToWhishList(product)}
                                    >
                                        {<AiFillHeart fontSize={21} />}
                                    </Button>
                                </Tooltip>
                            </div>
                        </section>
                    )}
                </main>
                <ProductReview
                    setProceed={setProceed}
                    authToken={authToken}
                    id={id}
                    setOpenAlert={setOpenAlert}
                />

                <Typography
                    sx={{
                        marginTop: 10,
                        marginBottom: 5,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Cхожие публикаций
                </Typography>
                <Box>
                    <Box
                        className="similarProduct"
                        sx={{
                            display: "flex",
                            overflowX: "auto",
                            marginBottom: 10,
                        }}
                    >
                        {similarProduct
                            .filter((prod) => prod._id !== id)
                            .map((prod) => (
                                <Link
                                    to={`/Detail/type/${prod.type}/${prod._id}`}
                                    key={prod._id}
                                >
                                    <ProductCard prod={prod} />
                                </Link>
                            ))}
                    </Box>
                </Box>
            </Container>
            <CopyRight sx={{mt: 8, mb: 10}} />
        </>
    );
};

export default ProductDetail;

import "./Desktop.css";
import React, {useContext, useEffect, useState} from "react";
import {
    AiOutlineHeart,
    AiOutlineShoppingCart,
    AiFillCloseCircle,
} from "react-icons/ai";
import {CgProfile} from "react-icons/cg";
import {FiLogOut} from "react-icons/fi";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {
    Badge,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Menu,
    MenuItem,
    Slide,
    Tooltip,
    Typography,
} from "@mui/material";
import {ContextFunction} from "../Context/Context";
import {toast} from "react-toastify";
import {
    getCart,
    getWishList,
    handleLogOut,
    handleClickOpen,
    handleClose,
    Transition,
} from "../Constants/Constant";

const DesktopNavigation = () => {
    const {cart, setCart, wishlistData, setWishlistData} =
        useContext(ContextFunction);
    const [openAlert, setOpenAlert] = useState(false);
    const navigate = useNavigate();
    let authToken = localStorage.getItem("Authorization");
    let setProceed = authToken !== null ? true : false;
    useEffect(() => {
        getCart(setProceed, setCart, authToken);
        getWishList(setProceed, setWishlistData, authToken);
    }, []);

    return (
        <>
            <nav className="nav">
                <div className="logo">
                    <Link to="/">
                        <span>Бюро находок</span>
                    </Link>
                </div>
                <div className="nav-items">
                    <ul className="nav-items">
                        <li className="nav-links">
                            <NavLink to="/">
                                <span className="nav-icon-span">Главная</span>
                            </NavLink>
                        </li>
                        {/* <li className="nav-links">
              <NavLink to='/contact'>
                <span className='nav-icon-span'>  Contact Us</span>
              </NavLink>
            </li> */}

                        <li className="nav-links">
                            <Tooltip title="Избранное">
                                <NavLink to="/wishlist">
                                    <span className="nav-icon-span">
                                        Избранное{" "}
                                        <Badge
                                            badgeContent={
                                                setProceed
                                                    ? wishlistData.length
                                                    : 0
                                            }
                                        >
                                            {" "}
                                            <AiOutlineHeart className="nav-icon" />
                                        </Badge>
                                    </span>
                                </NavLink>
                            </Tooltip>
                        </li>

                        {setProceed ? (
                            <>
                                <li className="nav-links">
                                    <Tooltip title="Профиль">
                                        <NavLink to="/update">
                                            <span className="nav-icon-span">
                                                {" "}
                                                <CgProfile
                                                    style={{
                                                        fontSize: 29,
                                                        marginTop: 7,
                                                        marginRight: 10,
                                                    }}
                                                />
                                            </span>
                                        </NavLink>
                                    </Tooltip>
                                </li>
                                <li
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyItems: "center",
                                    }}
                                    onClick={() =>
                                        handleClickOpen(setOpenAlert)
                                    }
                                >
                                    <Button
                                        variant="contained"
                                        className="nav-icon-span"
                                        sx={{marginBottom: 1}}
                                        endIcon={<FiLogOut />}
                                    >
                                        <Typography variant="button">
                                            Выйти
                                        </Typography>
                                    </Button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-links">
                                <Tooltip title="Авторизация">
                                    <NavLink to="/login">
                                        <span className="nav-icon-span">
                                            {" "}
                                            <CgProfile
                                                style={{
                                                    fontSize: 29,
                                                    marginTop: 7,
                                                }}
                                            />
                                        </span>
                                    </NavLink>
                                </Tooltip>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
            <Dialog
                open={openAlert}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent
                    sx={{
                        width: {xs: 280, md: 350, xl: 400},
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h6">
                        Вы уверены что хотите выйти?
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{display: "flex", justifyContent: "space-evenly"}}
                >
                    <Link to="/">
                        <Button
                            variant="contained"
                            endIcon={<FiLogOut />}
                            color="primary"
                            onClick={() =>
                                handleLogOut(
                                    setProceed,
                                    toast,
                                    navigate,
                                    setOpenAlert
                                )
                            }
                        >
                            Выйти
                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        color="error"
                        endIcon={<AiFillCloseCircle />}
                        onClick={() => handleClose(setOpenAlert)}
                    >
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DesktopNavigation;

import '../Login/login.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { MdLockOutline } from 'react-icons/md'
import { Box, Container } from '@mui/system'
import { toast } from 'react-toastify'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

import CopyRight from '../../../Components/CopyRight/CopyRight'


const AdminRegister = () => {

  const [credentials, setCredentials] = useState({ firstName: "", lastName: '', email: "", phoneNumber: '', password: "", key: "" })
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate()
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    let auth = localStorage.getItem('Authorization');
    if (auth) {
      navigate("/")
    }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    let phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/gm;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
      if (!credentials.email && !credentials.firstName && !credentials.password && !credentials.phoneNumber && !credentials.lastName) {
        toast.error("Все поля обязательны для заполнения", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.firstName.length <= 3 || credentials.lastName.length <= 3) {
        toast.error("Введите имя и фамилию длиной больше 3 символов", { autoClose: 500, theme: 'colored' })
      }
      else if (!emailRegex.test(credentials.email)) {
        toast.error("Пожалуйста, введите корректный email", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.password.length < 5) {
        toast.error("Пароль должен содержать более 5 символов", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.email && credentials.firstName && credentials.lastName && credentials.phoneNumber && credentials.password) {
        const sendAuth = await axios.post(process.env.REACT_APP_ADMIN_REGISTER,
          {
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            email: credentials.email,
            phoneNumber: credentials.phoneNumber,
            password: credentials.password,
            key: credentials.key
          })
        const receive = await sendAuth.data
        if (receive.success === true) {
          toast.success("Регистрация прошла успешно", { autoClose: 500, theme: 'colored' })
          localStorage.setItem('Authorization', receive.authToken)
          navigate('/admin/home')
        }
        else {
          toast.error("Неверные данные", { autoClose: 500, theme: 'colored' })
        }
      }
    } catch (error) {
      toast.error("Неверные данные", { autoClose: 500, theme: 'colored' })
    }

  }

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ marginBottom: 10 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
            <MdLockOutline />
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={credentials.firstName}
                  onChange={handleOnChange}
                  required
                  fullWidth
                  id="firstName"
                  label="Имя"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Фамилия"
                  name="lastName"
                  value={credentials.lastName}
                  onChange={handleOnChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Электронная почта"
                  name="email"
                  value={credentials.email}
                  onChange={handleOnChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Номер телефона"
                  name="phoneNumber"
                  value={credentials.phoneNumber}
                  onChange={handleOnChange}
                  inputMode='numeric'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  value={credentials.password}
                  onChange={handleOnChange}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" onClick={handleClickShowPassword} sx={{ cursor: 'pointer' }}>
                        {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                      </InputAdornment>
                    )
                  }}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={credentials.key}
                  name='key'
                  onChange={handleOnChange}
                  label="Код администратора"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Я хочу получать вдохновение, маркетинговые акции и обновления по электронной почте."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Зарегистрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Уже есть аккаунт?
                <Link to='/admin/login' style={{ color: '#1976d2', marginLeft: 3 }}>
                  Войти
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <CopyRight sx={{ mt: 5 }} />
      </Container>
    </>
  )
}

export default AdminRegister

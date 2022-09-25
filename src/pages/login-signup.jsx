import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { login, signup } from '../store/actions/user.action'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import leftHero from '../assets/img/left-loginsignup-hero.svg'
import rightHero from '../assets/img/right-loginsignup-hero.svg'
import GoogleLogin from 'react-google-login'
const logo = require('../assets/img/logo-frello.png')

export const LoginSignup = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [status, setStatus] = useState(params.status)

  useEffect(() => {
    setStatus(params.status)
  }, [params.status])

  // useEffect(() => {
  //   google.accounts.id.initialize({
  //     client_id: '1031425776599-1fk9n9l1d95umd9mtgikqjbsi5gcf571.apps.googleusercontent.com',
  //     callback: handleCallbackResponse,
  //   })
  // }, [])

  const handleCallbackResponse = (response) => {}

  const formik = useFormik({
    initialValues: {
      fullname: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().max(15, 'Must be 15 characters or less'),
      username: Yup.string().max(20, 'Must be 20 characters or less'),
      password: Yup.string()
        .required('No password provided.')
        .min(5, 'Password is too short - should be 5 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    }),
    onSubmit: (values) => {
      if (status === 'signup') {
        ;(async () => {
          await dispatch(signup(values))
          navigate('/workspace')
        })()
      }
      if (status === 'login') {
        ;(async () => {
          await dispatch(login(values))
          navigate('/workspace')
        })()
      }
    },
  })

  const handleFocus = (ev) => {
    ev.target.classList.add('focus')
  }

  const responseGoogle = (response) => {
    console.log(response)
  }

  const formTxt = status === 'login' ? 'Log in to Frello' : 'Sign up for your account'

  return (
    <section className="form-container">
      <div className="form-logo">
        <img src={logo} alt="" />
        <h1>Frello</h1>
      </div>
      <form className="signup-form" onSubmit={formik.handleSubmit}>
        <h5>{formTxt}</h5>

        {status === 'signup' && (
          <React.Fragment>
            <input
              id="fullname"
              name="fullname"
              type="text"
              onChange={formik.handleChange}
              onFocus={handleFocus}
              onBlur={formik.handleBlur}
              value={formik.values.fullname}
              placeholder="Enter full name"
            />
            {formik.touched.fullname && formik.errors.fullname ? (
              <span className="error">{formik.errors.fullname}</span>
            ) : (
              <span>&nbsp;</span>
            )}
          </React.Fragment>
        )}

        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onFocus={handleFocus}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder="Enter user name"
        />
        {formik.touched.username && formik.errors.username ? (
          <span className="error">{formik.errors.username}</span>
        ) : (
          <span>&nbsp;</span>
        )}

        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onFocus={handleFocus}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Enter password"
        />
        {formik.touched.password && formik.errors.password ? (
          <span className="error">{formik.errors.password}</span>
        ) : (
          <span>&nbsp;</span>
        )}

        <button type="submit">{formTxt}</button>
        {/* <button>Sign up with google</button> */}
        <GoogleLogin
          clientId="1031425776599-1fk9n9l1d95umd9mtgikqjbsi5gcf571.apps.googleusercontent.com"
          buttonText="Sign up with google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        {status === 'login' && (
          <NavLink className="already-have-account" to={'/user/signup'}>
            Sign up for an account
          </NavLink>
        )}
        {status === 'signup' && (
          <NavLink className="already-have-account" to={'/user/login'}>
            Already have an account? Log In
          </NavLink>
        )}
      </form>
      <img src={leftHero} alt="leftHero" className="left-hero" />
      <img src={rightHero} alt="rightHero" className="right-hero" />
    </section>
  )
}

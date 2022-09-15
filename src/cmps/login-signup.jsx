import React, { useState } from "react"
import ReactDOM from "react-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
// import { login, signup } from "../store/actions/user.action"
// import { useDispatch } from "react-redux"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

export const LoginSignup = () => {
    const params = useParams()
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const [status, setStatus] = useState(params.status)

    useEffect(() => {
        setStatus(params.status)
    }, [params.status])

    const formik = useFormik({
        initialValues: {
            fullname: "",
            username: "",
            // email: "",
            password: ""
        },
        validationSchema: Yup.object({
            fullname: Yup.string()
                .max(15, "Must be 15 characters or less"),
            // .required("Required"),
            username: Yup.string().max(20, "Must be 20 characters or less"),
            // email: Yup.string()
            //     .email("Invalid email address")
            //     .required("Required"),
            password: Yup.string()
                .required('No password provided.')
                .min(5, 'Password is too short - should be 8 chars minimum.')
                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        }),
        onSubmit: (values) => {
            if (status === 'signup') {
                ; (async () => {
                    // await dispatch(signup(values))
                    navigate('/')
                })()
            }
            if (status === 'login') {
                ; (async () => {
                    // await dispatch(login(values))
                    navigate('/')
                })()
            }
        }
    })

    const handleFocus = ev => {
        ev.target.classList.add("focus")
    }

    const onBlur = (ev, inputName) => {
        if (formik.values[inputName]) return
        ev.target.classList.remove("focus")
    }

    const formTxt = (status === 'login') ? 'Log in' : 'Sign up'

    return (
        <form className="signup-form" onSubmit={formik.handleSubmit}>
            <h5>{formTxt} for your account</h5>

            {status === 'signup' && < React.Fragment >
                <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    onChange={formik.handleChange}
                    onFocus={handleFocus}
                    onBlur={formik.handleBlur}
                    onBlurCapture={(ev) => { onBlur(ev, 'fullname') }}
                    value={formik.values.fullname}
                />
                <label className="dynamic-placeholder" htmlFor="fullname">Full name</label>
                {formik.touched.fullname && formik.errors.fullname ? (
                    <span className="error">{formik.errors.fullname}</span>
                ) : <span>&nbsp;</span>}
            </React.Fragment>}

            <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onFocus={handleFocus}
                onBlur={formik.handleBlur}
                onBlurCapture={(ev) => { onBlur(ev, 'username') }}
                value={formik.values.username}
            />
            <label className="dynamic-placeholder" htmlFor="username">User name</label>
            {
                formik.touched.username && formik.errors.username ? (
                    <span className="error">{formik.errors.username}</span>
                ) : <span>&nbsp;</span>
            }

            {/* <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onFocus={handleFocus}
                onBlur={formik.handleBlur}
                onBlurCapture={(ev) => { onBlur(ev, 'email') }}
                value={formik.values.email}
            />
            <label className="dynamic-placeholder" htmlFor="email">Email address</label>
            {formik.touched.email && formik.errors.email ? (
                <span className="error">{formik.errors.email}</span>
            ) : <span>&nbsp;</span>} */}

            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onFocus={handleFocus}
                onBlur={formik.handleBlur}
                onBlurCapture={(ev) => { onBlur(ev, 'password') }}
                value={formik.values.password}
            />
            <label className="dynamic-placeholder" htmlFor="password">Password</label>
            {
                formik.touched.password && formik.errors.password ? (
                    <span className="error">{formik.errors.password}</span>
                ) : <span>&nbsp;</span>
            }

            <button type="submit">{formTxt}</button>
            {status === 'login' && <NavLink to={'/user/signup'}>Don't have an account yet? Sign up</NavLink>}
            {status === 'signup' && <NavLink to={'/user/login'}>Already have an account? Login</NavLink>}
        </form >
    )
}


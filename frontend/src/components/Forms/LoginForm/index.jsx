import React from 'react'
import PropTypes from 'prop-types'
import LoginImage from 'assets/images/login-image.jpg'
import './style.scss'
// YUP
import * as Yup from 'yup'
// COMPONENTS
import { Formik, Form, FastField } from 'formik'
import InputField from 'components/FormFields/InputField'
import CheckboxField from 'components/FormFields/CheckboxField'
import Spinner from 'components/Spinner'

const initialValues = {
	username: '',
	password: '',
	isRemember: false,
}

const validationSchema = Yup.object({
	username: Yup.string().required('Bạn cần phải nhập tài khoản!'),
	password: Yup.string()
		.required('Bạn cần phải nhập mật khẩu!')
		.min(6, 'Mật khẩu phải từ 6-32 ký tự')
		.max(32, 'Mật khẩu phải từ 6-32 ký tự'),
})

LoginForm.propTypes = {
	onSubmit: PropTypes.func,
	submitLoading: PropTypes.bool,
}

LoginForm.defaultProps = {
	onSubmit: () => {},
	submitLoading: false,
}

function LoginForm(props) {
	const { onSubmit, submitLoading } = props

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={values => {
				onSubmit(values)
			}}
		>
			{() => {
				return (
					<Form className="login-form">
						<div className="login-form__image">
							<img src={LoginImage} alt="Login" />
						</div>
						<div className="login-form__info">
							<h1 className="login-form__title">Đăng Nhập</h1>
							<div className="login-form__row">
								<FastField
									label="Tài khoản"
									placeholder="Tài khoản"
									name="username"
									component={InputField}
								/>
							</div>
							<div className="login-form__row">
								<FastField
									type="password"
									label="Mật khẩu"
									placeholder="Mật khẩu"
									name="password"
									component={InputField}
								/>
							</div>
							<div className="login-form__row">
								<FastField
									label="Ghi nhớ"
									name="isRemember"
									type="checkbox"
									component={CheckboxField}
								/>
							</div>
							<div className="login-form__row">
								<div className="form-group">
									<button
										className="sign-in-btn"
										type="submit"
										disabled={submitLoading}
									>
										{submitLoading && (
											<Spinner size={24} thickness={5} color="white" />
										)}
										<span>Đăng nhập</span>
									</button>
								</div>
							</div>
						</div>
					</Form>
				)
			}}
		</Formik>
	)
}

export default LoginForm

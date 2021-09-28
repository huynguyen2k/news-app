import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import * as Yup from 'yup'
// COMPONENTS
import { Formik, Form, FastField } from 'formik'
import InputField from 'components/FormFields/InputField'
import FileField from 'components/FormFields/FileField'
import SelectField from 'components/FormFields/SelectField'

const initialValues = {
	full_name: '',
	username: '',
	password: '',
	avatar: null,
	role_id: null,
}

const validationSchema = Yup.object().shape({
	full_name: Yup.string().required('Bạn phải nhập họ và tên!'),
	username: Yup.string().required('Bạn phải nhập tài khoản!'),
	password: Yup.string()
		.required('Bạn phải nhập vào mật khẩu!')
		.min(6, 'Mật khẩu phải từ 6-32 ký tự')
		.max(32, 'Mật khẩu phải từ 6-32 ký tự'),
	avatar: Yup.object()
		.transform((value, originalValue) => {
			if (originalValue) {
				return {}
			}
			return null
		})
		.required('Bạn phải chọn 1 ảnh đại diện!')
		.nullable(),
	role_id: Yup.number()
		.required('Bạn phải chọn chức vụ cho thành viên!')
		.nullable(),
})

AddUserForm.propTypes = {
	userRoleOptions: PropTypes.array,
	onAddUserSubmit: PropTypes.func,
}

AddUserForm.defaultProps = {
	userRoleOptions: [],
	onAddUserSubmit: () => {},
}

function AddUserForm({ userRoleOptions, onAddUserSubmit }) {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={values => onAddUserSubmit(values)}
		>
			{() => {
				return (
					<Form className="add-user-form">
						<h3 className="add-user-form__title">Thêm thành viên</h3>
						<div className="add-user-form__row">
							<FastField
								name="role_id"
								component={SelectField}
								label="Chức vụ"
								placeholder="Chọn chức vụ cho thành viên"
								options={userRoleOptions}
							/>
						</div>
						<div className="add-user-form__row">
							<FastField
								label="Họ và tên"
								placeholder="Họ và tên"
								name="full_name"
								component={InputField}
							/>
						</div>
						<div className="add-user-form__row">
							<FastField
								label="Tài khoản"
								placeholder="Tài khoản"
								name="username"
								component={InputField}
							/>
						</div>
						<div className="add-user-form__row">
							<FastField
								label="Mật khẩu"
								type="password"
								placeholder="Mật khẩu"
								name="password"
								component={InputField}
							/>
						</div>
						<div className="add-user-form__row">
							<FastField
								label="Ảnh đại diện"
								name="avatar"
								component={FileField}
							/>
						</div>
						<div className="add-user-form__row">
							<div className="form-group">
								<button type="submit" className="submit-btn">
									Thêm
								</button>
							</div>
						</div>
					</Form>
				)
			}}
		</Formik>
	)
}

export default AddUserForm

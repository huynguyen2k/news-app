import React from 'react'
import './style.scss'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
// COMPONENTS
import { Formik, Form, FastField } from 'formik'
import InputField from 'components/FormFields/InputField'
import FileField from 'components/FormFields/FileField'
import SelectField from 'components/FormFields/SelectField'

const validationSchema = Yup.object().shape({
	full_name: Yup.string().required('Bạn phải nhập họ và tên!'),
	role_id: Yup.number()
		.required('Bạn phải chọn chức vụ cho thành viên!')
		.nullable(),
})

EditUserForm.propTypes = {
	userEdit: PropTypes.object,
	userRoleOptions: PropTypes.array,
	onEditUserSubmit: PropTypes.func,
}

EditUserForm.defaultProps = {
	userEdit: {},
	userRoleOptions: [],
	onEditUserSubmit: () => {},
}

function EditUserForm(props) {
	const { userEdit, userRoleOptions, onEditUserSubmit } = props

	return (
		<Formik
			initialValues={{
				user_id: userEdit.user_id,
				full_name: userEdit.full_name,
				role_id: userEdit.role_id,
				avatar: null,
			}}
			validationSchema={validationSchema}
			onSubmit={values => onEditUserSubmit(values)}
		>
			{() => {
				return (
					<Form className="edit-user-form">
						<h3 className="edit-user-form__title">Cập nhật thành viên</h3>
						<div className="edit-user-form__row">
							<FastField
								name="role_id"
								label="Chức vụ"
								placeholder="Chọn chức vụ cho thành viên"
								options={userRoleOptions}
								component={SelectField}
							/>
						</div>
						<div className="edit-user-form__row">
							<FastField
								label="Họ và tên"
								placeholder="Họ và tên"
								name="full_name"
								component={InputField}
							/>
						</div>
						<div className="edit-user-form__row">
							<FastField
								label="Ảnh đại diện"
								src={userEdit.avatar}
								name="avatar"
								component={FileField}
							/>
						</div>
						<div className="edit-user-form__row">
							<div className="form-group">
								<button type="submit" className="submit-btn">
									Cập nhật
								</button>
							</div>
						</div>
					</Form>
				)
			}}
		</Formik>
	)
}

export default EditUserForm

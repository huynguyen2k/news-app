import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
// COMPONENTS
import { CircularProgress } from '@material-ui/core'

Spinner.propTypes = {
	size: PropTypes.number,
	thickness: PropTypes.number,
	color: PropTypes.string,
}

Spinner.defaultProps = {
	size: 24,
	thickness: 5,
	color: 'white',
}

function Spinner({ size, thickness, color }) {
	const useStyles = makeStyles({
		colorPrimary: {
			color,
		},
	})
	const classes = useStyles()

	return (
		<CircularProgress
			size={size}
			thickness={thickness}
			classes={{
				colorPrimary: classes.colorPrimary,
			}}
		/>
	)
}

export default Spinner

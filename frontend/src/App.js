import './App.scss'
import { Router, Switch, Route } from 'react-router-dom'
// Utils
import { history } from 'utils/history'
// PAGES
import LoginPage from 'pages/Login'
import NotFoundPage from 'pages/NotFound'
// COMPONENTS
import PrivateRoute from 'components/PrivateRoute'
// HOOKS
import { useSelector } from 'react-redux'
// TEMPLATES
import SystemAdminTemplate from 'templates/SystemAdmin'
import AuthorTemplate from 'templates/Author'
import AdminTemplate from 'templates/Admin'
import MainTemplate from 'templates/Main'

function App() {
	const isAuth = useSelector(state => state.auth.isAuth)

	return (
		<div className="app">
			<Router history={history}>
				<Switch>
					<Route exact path="/login" component={LoginPage} />
					<PrivateRoute
						isAuth={isAuth}
						path="/system-admin"
						component={SystemAdminTemplate}
					/>
					<PrivateRoute
						isAuth={isAuth}
						path="/admin"
						component={AdminTemplate}
					/>
					<PrivateRoute
						isAuth={isAuth}
						path="/author"
						component={AuthorTemplate}
					/>
					<Route path="/" component={MainTemplate} />
					<Route component={NotFoundPage} />
				</Switch>
			</Router>
		</div>
	)
}

export default App

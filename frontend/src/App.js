import './App.scss'
import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
// UTILS
import { history } from 'utils/history'
// HOOKS
import { useSelector } from 'react-redux'
// COMPONENTS
import Loading from 'components/Loading'
import PrivateRoute from 'components/PrivateRoute'
// PAGES
const LoginPage = React.lazy(() => import('pages/Login'))
const NotFoundPage = React.lazy(() => import('pages/NotFound'))
// TEMPLATES
const SystemAdminTemplate = React.lazy(() => import('templates/SystemAdmin'))
const AdminTemplate = React.lazy(() => import('templates/Admin'))
const AuthorTemplate = React.lazy(() => import('templates/Author'))
const MainTemplate = React.lazy(() => import('templates/Main'))

function App() {
	const isAuth = useSelector(state => state.auth.isAuth)

	return (
		<div className="app">
			<React.Suspense fallback={<Loading loading={true} />}>
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
			</React.Suspense>
		</div>
	)
}

export default App

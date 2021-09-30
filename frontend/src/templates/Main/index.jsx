import React from 'react'
import './style.scss'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
// COMPONENTS
import Loading from 'components/Loading'
import TopNav from 'components/TopNav'
import ScrollToTop from 'components/ScrollToTop'
// PAGES
const HomePage = React.lazy(() => import('pages/Home'))
const NewsDetailPage = React.lazy(() => import('pages/NewsDetail'))

function MainTemplate() {
	const match = useRouteMatch()

	return (
		<div className="main">
			<TopNav />
			<ScrollToTop>
				<React.Suspense fallback={<Loading loading={true} />}>
					<Switch>
						<Route exact path={match.path} component={HomePage} />
						<Route
							exact
							path={`${match.path}news-detail/:news_id`}
							component={NewsDetailPage}
						/>
					</Switch>
				</React.Suspense>
			</ScrollToTop>
		</div>
	)
}

export default MainTemplate

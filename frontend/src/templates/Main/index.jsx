import React from 'react'
import './style.scss'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
// COMPONENTS
import TopNav from 'components/TopNav'
import ScrollToTop from 'components/ScrollToTop'
// PAGES
import HomePage from 'pages/Home'
import NewsDetailPage from 'pages/NewsDetail'

function MainTemplate() {
	const match = useRouteMatch()

	return (
		<div className="main">
			<TopNav />
			<ScrollToTop>
				<Switch>
					<Route exact path={match.path} component={HomePage} />
					<Route
						exact
						path={`${match.path}news-detail/:news_id`}
						component={NewsDetailPage}
					/>
				</Switch>
			</ScrollToTop>
		</div>
	)
}

export default MainTemplate

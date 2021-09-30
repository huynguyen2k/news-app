import React from 'react'
import {
	Switch,
	Redirect,
	Route,
	useHistory,
	useRouteMatch,
} from 'react-router-dom'
import './style.scss'
// HOOKS
import { useSelector, useDispatch } from 'react-redux'
// COMPONENTS
import SideMenu from 'components/SideMenu'
import Loading from 'components/Loading'
// ICONS
import PaletteRoundedIcon from '@material-ui/icons/PaletteRounded'
import PageIcon from '@material-ui/icons/FileCopyRounded'
import ChartIcon from '@material-ui/icons/DonutSmallRounded'
import FolderIcon from '@material-ui/icons/Folder'
import TableIcon from '@material-ui/icons/AppsRounded'
import EmotionIcon from '@material-ui/icons/EmojiEmotionsRounded'
// ACTIONS
import { signOutUser } from 'app/slices/authSlice'
// PAGES
const TopicManagementPage = React.lazy(() => import('pages/TopicManagement'))
const SubtopicManagement = React.lazy(() => import('pages/SubtopicManagement'))
const NewsManagement = React.lazy(() => import('pages/NewsManagement'))

const menu = [
	{
		icon: <PageIcon />,
		title: 'Bản tin',
		url: '/author/news',
	},
	{
		icon: <PaletteRoundedIcon />,
		title: 'Chủ đề',
		url: '/author/topics',
		subMenu: [
			{
				title: 'Chủ đề chính',
				url: '/author/topics',
			},
			{
				title: 'Chủ đề phụ',
				url: '/author/topics/subtopics',
			},
		],
	},
	{
		icon: <ChartIcon />,
		title: 'Biểu đồ',
		url: '/author/charts',
	},
	{
		icon: <FolderIcon />,
		title: 'Trang',
		url: '/author/pages',
	},
	{
		icon: <TableIcon />,
		title: 'Bảng',
		url: '/author/tables',
	},
	{
		icon: <EmotionIcon />,
		title: 'Biểu tượng',
		url: '/author/icons',
	},
]

function AuthorTemplate() {
	const history = useHistory()
	const match = useRouteMatch()

	const dispatch = useDispatch()
	const loading = useSelector(state => state.auth.loading)
	const userProfile = useSelector(state => state.auth.user)

	async function handleSignOut() {
		await dispatch(signOutUser())
		history.push('/login')
	}

	return (
		<div className="author">
			<Loading loading={loading} />
			<div className="author__left-panel">
				<SideMenu
					menu={menu}
					profile={{
						avatar: userProfile.avatar,
						name: userProfile.full_name,
						role: userProfile.role_name,
					}}
					onSignOut={handleSignOut}
				/>
			</div>
			<div className="author__right-panel">
				<React.Suspense fallback={<Loading loading={true} />}>
					<Switch>
						<Redirect exact from={`${match.path}`} to={`${match.path}/news`} />
						<Route
							exact
							path={`${match.path}/news`}
							component={NewsManagement}
						/>
						<Route
							exact
							path={`${match.path}/topics`}
							component={TopicManagementPage}
						/>
						<Route
							exact
							path={`${match.path}/topics/subtopics`}
							component={SubtopicManagement}
						/>
					</Switch>
				</React.Suspense>
			</div>
		</div>
	)
}

export default AuthorTemplate

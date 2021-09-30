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
import PaletteRoundedIcon from '@material-ui/icons/PaletteRounded'
import PageIcon from '@material-ui/icons/FileCopyRounded'
import ChartIcon from '@material-ui/icons/DonutSmallRounded'
import FolderIcon from '@material-ui/icons/Folder'
import TableIcon from '@material-ui/icons/AppsRounded'
import EmotionIcon from '@material-ui/icons/EmojiEmotionsRounded'
// ACTIONS
import { signOutUser } from 'app/slices/authSlice'
// PAGES
const ApproveTopicPage = React.lazy(() => import('pages/ApproveTopic'))
const ApproveSubtopicPage = React.lazy(() => import('pages/ApproveSubtopic'))
const ApproveNewsPage = React.lazy(() => import('pages/ApproveNews'))

const menu = [
	{
		icon: <PageIcon />,
		title: 'Duyệt bản tin',
		url: '/admin/approve-news',
	},
	{
		icon: <PaletteRoundedIcon />,
		title: 'Duyệt chủ đề',
		url: '/admin/topics',
		subMenu: [
			{
				title: 'Chủ đề chính',
				url: '/admin/topics/approve-topics',
			},
			{
				title: 'Chủ đề phụ',
				url: '/admin/topics/approve-subtopics',
			},
		],
	},
	{
		icon: <ChartIcon />,
		title: 'Biểu đồ',
		url: '/admin/charts',
	},
	{
		icon: <FolderIcon />,
		title: 'Trang',
		url: '/admin/pages',
	},
	{
		icon: <TableIcon />,
		title: 'Bảng',
		url: '/admin/tables',
	},
	{
		icon: <EmotionIcon />,
		title: 'Biểu tượng',
		url: '/admin/icons',
	},
]

function AdminTemplate() {
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
		<div className="admin">
			<Loading loading={loading} />
			<div className="admin__left-panel">
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
			<div className="admin__right-panel">
				<React.Suspense fallback={<Loading loading={true} />}>
					<Switch>
						<Redirect
							exact
							from={`${match.path}`}
							to={`${match.path}/approve-news`}
						/>
						<Route
							exact
							from={`${match.path}/approve-news`}
							component={ApproveNewsPage}
						/>
						<Route
							exact
							path={`${match.path}/topics/approve-topics`}
							component={ApproveTopicPage}
						/>
						<Route
							exact
							path={`${match.path}/topics/approve-subtopics`}
							component={ApproveSubtopicPage}
						/>
					</Switch>
				</React.Suspense>
			</div>
		</div>
	)
}

export default AdminTemplate

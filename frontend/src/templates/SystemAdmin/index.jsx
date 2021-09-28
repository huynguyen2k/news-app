import React from 'react'
import './style.scss'
// HOOKS
import { useSelector, useDispatch } from 'react-redux'
// PAGES
import UserManagementPage from 'pages/UserManagement'
// COMPONENTS
import SideMenu from 'components/SideMenu'
import Loading from 'components/Loading'
import {
	Switch,
	Route,
	Redirect,
	useHistory,
	useRouteMatch,
} from 'react-router-dom'
// ICONS
import HomeIcon from '@material-ui/icons/HomeRounded'
import UserIcon from '@material-ui/icons/PeopleAltRounded'
import PaletteRoundedIcon from '@material-ui/icons/PaletteRounded'
import PageIcon from '@material-ui/icons/FileCopyRounded'
import ChartIcon from '@material-ui/icons/DonutSmallRounded'
import FolderIcon from '@material-ui/icons/Folder'
import TableIcon from '@material-ui/icons/AppsRounded'
import EmotionIcon from '@material-ui/icons/EmojiEmotionsRounded'
// ACTIONS
import { signOutUser } from 'app/slices/authSlice'

const menu = [
	{
		icon: <HomeIcon />,
		title: 'Bảng điều khiển',
		url: '/system-admin/dashboard',
	},
	{
		icon: <UserIcon />,
		title: 'Người dùng',
		url: '/system-admin/users',
	},
	{
		icon: <PaletteRoundedIcon />,
		title: 'Chủ đề',
		url: '/system-admin/topics',
		subMenu: [
			{
				title: 'Đã duyệt',
				url: '/system-admin/topics/approved',
			},
			{
				title: 'Chờ duyệt',
				url: '/system-admin/topics/unapproved',
			},
			{
				title: 'Không được duyệt',
				url: '/system-admin/topics/unaccepted',
			},
		],
	},
	{
		icon: <PageIcon />,
		title: 'Bài viết',
		url: '/system-admin/posts',
		subMenu: [
			{
				title: 'Đã duyệt',
				url: '/system-admin/posts/approved',
			},
			{
				title: 'Chờ duyệt',
				url: '/system-admin/posts/unapproved',
			},
			{
				title: 'Không được duyệt',
				url: '/system-admin/posts/unaccepted',
			},
		],
	},
	{
		icon: <ChartIcon />,
		title: 'Biểu đồ',
		url: '/system-admin/charts',
	},
	{
		icon: <FolderIcon />,
		title: 'Trang',
		url: '/system-admin/pages',
	},
	{
		icon: <TableIcon />,
		title: 'Bảng',
		url: '/system-admin/tables',
	},
	{
		icon: <EmotionIcon />,
		title: 'Biểu tượng',
		url: '/system-admin/icons',
	},
]

function SystemAdminTemplate() {
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
		<div className="system-admin">
			<Loading loading={loading} />
			<div className="system-admin__left-panel">
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
			<div className="system-admin__right-panel">
				<Switch>
					<Redirect exact from={`${match.path}`} to={`${match.path}/users`} />
					<Route
						exact
						path={`${match.path}/users`}
						component={UserManagementPage}
					/>
				</Switch>
			</div>
		</div>
	)
}

export default SystemAdminTemplate

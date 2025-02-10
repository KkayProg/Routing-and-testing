import { Link, useParams } from "react-router-dom";
import { USERS } from "../../data";
import "./UserInfoPage.css";

export function UserInfoPage() {
	const { userId } = useParams();
	const user = USERS[Number(userId)];

	if (!user) {
		return (
			<div className="userInfoPage">
				<h2>UserInfoPage</h2>

				<div className="users">
					<p>Пользователя с таким userId нет</p>
				</div>
			</div>
		);
	}

	return (
		<div className="userInfoPage">
			<h2>UserInfoPage</h2>

			<div className="users">
				<p>{user.jobTitle}</p>
				<p data-testid='user-email'>{user.email}</p>
				<img src={user.avatar} alt="" width={200} height={200} />
				<p data-testid='user-name'>{user.fullName}</p>
				<p>{user.bio}</p>
				{user.playlist?.name && (
					<Link to={`/playlists/${user.playlist.id}`}>
						playlist: {user.playlist.name}
					</Link>
				)}
			</div>
		</div>
	);
}

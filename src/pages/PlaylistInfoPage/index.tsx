import { Link, useParams } from "react-router-dom";
import { PLAYLISTS } from "../../data";
import "./PlaylistInfoPage.css";

export const PlaylistunfoPage = () => {
    const { playlistId } = useParams();
    const playlist = PLAYLISTS[Number(playlistId)];

    if (!playlist || playlist.genre === "Non Music") {
        return (
            <div>
                <h2>Playlist Not Found</h2>
                <p>Sorry, the playlist with ID {playlistId} does not exist </p>
                <Link to="/playlists">Back to Playlists</Link>
            </div>
        );
    }

    return (
        <div>
            <h2>{playlist.name}</h2>
            <h4>
                Жанр:{" "}
                <Link to={`/playlists?searchPlaylistGenre=${encodeURIComponent(playlist.genre.toLowerCase())}`}>
                    {playlist.genre}
                </Link>
            </h4>
            <ul className="playlist__list">
                {playlist.songs.map((song, index) => (
                    <li key={index} className="playlist__list-item">{song}</li>
                ))}
            </ul>
        </div>
    )
}
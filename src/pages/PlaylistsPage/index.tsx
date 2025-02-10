import { Link, useParams, useSearchParams } from "react-router-dom";
import { PLAYLISTS } from "../../data";
import "./PlaylistsPage.css";
import { ChangeEvent } from "react";

export function PlaylistsPage() {
    const playlists = PLAYLISTS;
    const [searchParam, setSearchParam] = useSearchParams();

    const handleSearchPlaylistName = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setSearchParam((prevParams) => {
            prevParams.set("searchPlaylistName", value.toLowerCase());
            return prevParams;
        });
    };

    const handleSearchPlaylistGenre = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setSearchParam((prevParams) => {
            prevParams.set("searchPlaylistGenre", value.toLowerCase());
            return prevParams;
        });
    };

    const searchPlaylistName = searchParam.get("searchPlaylistName") || "";
    const searchPlaylistGenre = searchParam.get("searchPlaylistGenre") || "";

    const filteredPlaylists = playlists.filter(({ name, genre }) =>
        name.toLowerCase().includes(searchPlaylistName) &&
        genre.toLowerCase().includes(searchPlaylistGenre)
    );

    return (
        <div>
            <h2>Плейлисты</h2>
            <div className="search">
                <label>
                    введите жанр{" "}
                    <input
                        data-testid='input-genre'
                        type="text"
                        value={searchPlaylistGenre}
                        onChange={handleSearchPlaylistGenre} />
                </label>
                <label>
                    введите название{" "}
                    <input
                        data-testid='input-name'
                        type="text"
                        value={searchPlaylistName}
                        onChange={handleSearchPlaylistName} />
                </label>
            </div>
            <ul className="playlists__list">
                {filteredPlaylists.map((playlist) =>
                    playlist.name ? (
                        <Link
                            to={`/playlists/${playlist.id}`}
                            key={playlist.id}
                            className="playlist__link"
                        >
                            {playlist.name}
                        </Link>
                    ) : null
                )}
            </ul>
        </div>
    );
}

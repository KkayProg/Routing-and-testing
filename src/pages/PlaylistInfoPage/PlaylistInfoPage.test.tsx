import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { useParams } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { PlaylistunfoPage } from "./index";

const PLAYLISTS = [
	{
		id: 2,
		genre: "Non Music",
		name: "",
		songs: [],
	},
	{
		id: 3,
		genre: "Pop",
		name: "easy Pop",
		songs: [
			"Begin the Beguine",
			"Thrift Shop",
			"Car Wash",
			"Big Bad John",
			"Rich Girl",
			"West End Blues",
			"Goodnight",
			"Make it With You",
			"Strawberry Fields Forever",
			"Take Me Home",
			"Beautiful Day",
			"Vogue",
			"Alone Again (Naturally)",
			"Bette Davis Eyes",
			"Bette Davis Eyes",
			"The Reason",
			"Lady Marmalade (Voulez-Vous Coucher Aver Moi Ce Soir?)",
			"If I Didn't Care",
			"Surfin' USA",
			"Take a Bow",
		],
	},
	{
		id: 4,
		genre: "Rap",
		name: "Gansta Rapp",
		songs: [
			"Foolish Games",
			"Sh-Boom (Life Could Be a Dream)",
			"It's My Party",
			"Working My Way Back to You",
			"Arthur's Theme (Best That You Can Do)",
			"(Put Another Nickel In) Music! Music! Music!",
			"West End Blues",
			"(It's No) Sin",
			"Green Tambourine",
			"Toxic",
			"Somethin' Stupid",
			"Shout",
			"Begin the Beguine",
			"Sweet Georgia Brown",
			"I Want You Back",
			"Umbrella",
			"Make it With You",
			"Like a Prayer",
			"Soul Man",
			"All You Need is Love",
		],
	},
]

jest.mock('react-router-dom', () => ({
	...jest.requireActual("react-router-dom"),
	useParams: jest.fn(),
}));

describe('PlaylistInfoPage', () => {
	test('Тест, проверяющий текст по умолчанию, если нет доступного плейлиста', () => {
		(useParams as jest.Mock).mockReturnValue({ playlistId: '100' })

		render(
			<BrowserRouter>
				<PlaylistunfoPage />
			</BrowserRouter>
		)

		expect(screen.getByText(/Playlist Not Found/i)).toBeInTheDocument();
		expect(screen.getByText(/Sorry, the playlist with ID 100 does not exist/i)).toBeInTheDocument();
	});

	test('Тест, проверяющий данный о плейлисте (жанр, название, количестве песен в списке)', () => {
		const testPlaylist = PLAYLISTS[1];

		(useParams as jest.Mock).mockReturnValue({ playlistId: testPlaylist.id.toString() })

		render(
			<BrowserRouter>
				<PlaylistunfoPage />
			</BrowserRouter>
		);

		expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(testPlaylist.name);

		const genreLink = screen.getByRole('link', { name: testPlaylist.genre });
		expect(genreLink).toBeInTheDocument();
		expect(genreLink).toHaveAttribute(
			'href',
			`/playlists?searchPlaylistGenre=${encodeURIComponent(testPlaylist.genre.toLowerCase())}`
		);

		const songItems = screen.getAllByRole('listitem');
		expect(songItems).toHaveLength(testPlaylist.songs.length);

		testPlaylist.songs.splice(0, 3).forEach(song => {
			expect(screen.getByText(song)).toBeInTheDocument();
		})
	})
});
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom';
import { BrowserRouter, useParams } from "react-router-dom"
import { UserInfoPage } from "./UserInfoPage"

const PLAYLISTS = [
    {
        id: 0,
        genre: "Rock",
        name: "Great Rock Hits",
    },
    {
        id: 1,
        genre: "Metal",
        name: "Yeah Metal",
    },
]

const USERS = [
    {
        id: 0,
        email: "Sophia3@gmail.com",
        fullName: "Abraham Walsh",
        jobTitle: "Investor Optimization Executive",
        avatar: "https://avatars.githubusercontent.com/u/14016129",
        bio: "Mollitia eos ducimus porro. Dolore nobis quas illum aliquam animi cumque vel adipisci atque. Dolores cupiditate nulla atque atque. Sunt odit veniam perspiciatis id error. Aliquam expedita esse nisi atque sint possimus quasi.",
        playlist: PLAYLISTS[0],
    },
    {
        id: 1,
        email: "Kirsten26@yahoo.com",
        fullName: "Cecelia Senger",
        jobTitle: "Lead Factors Planner",
        avatar:
            "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/494.jpg",
        bio: "Maxime ratione repellendus voluptas esse ut dolores sapiente consequuntur exercitationem. Officiis quo autem qui laborum adipisci. Nulla odio inventore dolores accusantium culpa occaecati aperiam dolor. Reiciendis omnis unde dolores. Magnam molestiae consectetur officia unde cumque maxime. Soluta expedita expedita corporis saepe asperiores non consequatur.",
        playlist: PLAYLISTS[1],
    },
    {
        id: 2,
        email: "Robb.Dicki33@gmail.com",
        fullName: "Gabriel Turner",
        jobTitle: "District Factors Designer",
        avatar: "https://avatars.githubusercontent.com/u/48007532",
        bio: "Placeat quis ex. Assumenda nam quidem delectus. Pariatur repellendus velit autem quos quisquam mollitia modi est impedit. Laborum quaerat consequatur quod eos aliquam nostrum. Ea maiores architecto laudantium distinctio culpa laboriosam cumque debitis quis. Suscipit eos deleniti distinctio repellat sequi corrupti quibusdam doloribus. Odio optio vel quod sapiente nemo aperiam quibusdam. Dolore ipsam repellendus voluptas nulla provident ea alias.",
    },
]


jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}))


describe('UserinfoPage', () => {
    test('Тест, проверяющий текст по умолчанию, если нет пользователя', () => {
        (useParams as jest.Mock).mockReturnValue({ userId: '999' })

        render(
            <BrowserRouter>
                <UserInfoPage />
            </BrowserRouter>
        );

        expect(screen.getByText(/Пользователя с таким userId нет/i)).toBeInTheDocument();
    });

    test('Тест, проверяющий данные о пользователе (email, имя, ссылка на плейлист)', () => {
        const testUser = USERS[0];

        (useParams as jest.Mock).mockReturnValue({ userId: testUser.id.toString() });

        render(
            <BrowserRouter>
                <UserInfoPage />
            </BrowserRouter>
        );

        expect(screen.getByTestId('user-email')).toHaveTextContent(testUser.email);
        expect(screen.getByTestId('user-name')).toHaveTextContent(testUser.fullName);

        if (testUser.playlist) {
            const playlistText = new RegExp(`playlist:\\s*${testUser.playlist.name}`, "i");
            const playlistLink = screen.getByText(playlistText);
            expect(playlistLink.closest("a")).toHaveAttribute("href", `/playlists/${testUser.playlist.id}`);
        }
    })
})
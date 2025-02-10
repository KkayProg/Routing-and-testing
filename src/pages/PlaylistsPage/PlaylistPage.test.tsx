import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { PlaylistsPage } from ".";


let fakeParams = new URLSearchParams();
const setSearchParamMock = jest.fn((updateFn) => {
    fakeParams = updateFn(fakeParams);
});

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        useSearchParams: () => [new URLSearchParams(), setSearchParamMock],
    };
});

describe('PlaylistPage', () => {
    beforeEach(() => {
        fakeParams = new URLSearchParams();
        setSearchParamMock.mockClear();
    });

    test('Tест, проверяющий вызов метода setSearchParam из react-router-dom при вводе жанра и названия', () => {
        render(
            <BrowserRouter>
                <PlaylistsPage />
            </BrowserRouter>
        );

        const inputGenre = screen.getByTestId('input-genre');
        fireEvent.change(inputGenre, { target: { value: 'Metal' } });

        const inputName = screen.getByTestId('input-name');
        fireEvent.change(inputName, { target: { value: 'Great Rock Hits' } });

        expect(fakeParams.get("searchPlaylistGenre")).toBe("metal");
        expect(fakeParams.get("searchPlaylistName")).toBe("great rock hits");
    })
})
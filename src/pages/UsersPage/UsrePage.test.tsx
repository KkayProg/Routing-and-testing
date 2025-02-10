import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { UsersPage } from "./UsersPage";

const setSearchParamMock = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: () => [new URLSearchParams(), setSearchParamMock],
  };
});

describe('UserPage', () => {
  test('Тест, проверяющий вызов метода setSearchParam из react-router-dom при вводе имени пользователя', () => {
    render(
      <BrowserRouter>
        <UsersPage />
      </BrowserRouter>
    );
    
    const input = screen.getByRole('textbox', { name: /введите имя/i });
    
    fireEvent.change(input, { target: { value: 'Abraham' } });

    expect(setSearchParamMock).toHaveBeenCalledWith({ searchName: 'abraham' });
  });
});

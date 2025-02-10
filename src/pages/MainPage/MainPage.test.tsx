import React from "react";
import { render } from "@testing-library/react";
import { MainPage } from "./MainPage";

describe('MainPage', () => {
    test('snapshot MainPage', () => {
        const { asFragment } = render(<MainPage />);
        expect(asFragment()).toMatchSnapshot();
    })
})
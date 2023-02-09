import React from "react";
import { render, screen } from "@testing-library/react";
import renderWithRouterAndRedux from "../tests/helpers/renderWithRouterAndRedux";
import Login from "../pages/Login";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import App from "../App";

describe("Testa tela de Login", () => {
  it("Testa se os campos de email e nome estão na tela", () => {
    renderWithRouterAndRedux(<Login />);

    const name = screen.getByTestId("input-player-name");
    expect(name).toBeInTheDocument();

    const email = screen.getByTestId("input-gravatar-email");
    expect(email).toBeInTheDocument();
  });
  it("Testa se é possível digitar nos campos de email e nome", () => {
    renderWithRouterAndRedux(<Login />);

    const name = screen.getByTestId("input-player-name");

    const email = screen.getByTestId("input-gravatar-email");

    userEvent.type(name, "Yuri");
    userEvent.type(email, "email@email.com");

    expect(name.value).toBe("Yuri");
    expect(email.value).toBe("email@email.com");
  });
  it("Testa se ao clicar no botão Configurações, redireciona para a página de Configurações", () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingsButton = screen.getByTestId("btn-settings");
    userEvent.click(settingsButton);

    const { pathname } = history.location;
    expect(pathname).toBe("/settings");

  });
  it('Testa se ao clicar no botão Play, redireciona para a página de jogo', () => {
    const {history} = renderWithRouterAndRedux(<Login/>);

    const name = screen.getByTestId("input-player-name");

    const email = screen.getByTestId("input-gravatar-email");

    userEvent.type(name, "Yuri");
    userEvent.type(email, "email@email.com");

    const playButton = screen.getByTestId("btn-play");
    expect(playButton).toBeInTheDocument();
    
    userEvent.click(playButton);
    const { pathname } = history.location;
    expect(pathname).toBe("/game");

  });
});

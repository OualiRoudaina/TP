import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("affiche le titre", () => {
  render(<App />);
  expect(screen.getByText(/TP Continuous Integration/i)).toBeInTheDocument();
});

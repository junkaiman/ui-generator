import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../src/components/Header";

describe("Header", () => {
  it("renders a heading", () => {
    render(<Header />);
    expect(screen.getByText("📐 Insta UI")).toBeInTheDocument();
  });
});

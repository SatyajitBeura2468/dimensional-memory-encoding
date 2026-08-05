import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NotFoundPage } from "./NotFoundPage";

describe("not found route", () => {
  it("offers real navigation without scientific filler", () => {
    render(<NotFoundPage />);
    expect(
      screen.getByRole("heading", { name: /page not found/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Story" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Paper" })).toHaveAttribute(
      "href",
      "/paper",
    );
    expect(screen.queryByText(/90\.8%/)).not.toBeInTheDocument();
  });
});

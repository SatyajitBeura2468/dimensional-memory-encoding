import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { HomePage } from "./HomePage";

describe("home story", () => {
  it("changes the selected history and spatial shuffle state", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );
    await user.click(screen.getByRole("button", { name: /right.*left/i }));
    expect(screen.getAllByText("Right → Left").length).toBeGreaterThan(0);
    await user.click(
      screen.getByRole("button", { name: /shuffle locations/i }),
    );
    expect(screen.getByText(/50.0%/)).toBeInTheDocument();
  });
});

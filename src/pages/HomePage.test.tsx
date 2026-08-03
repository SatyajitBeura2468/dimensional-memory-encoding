import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { HomePage } from "./HomePage";

describe("home story", () => {
  it("changes the selected history and spatial shuffle state", async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const protocol = screen.getByRole("group", {
      name: /select protocol history/i,
    });
    await user.click(
      within(protocol).getByRole("button", { name: /right.*left/i }),
    );
    expect(screen.getAllByText("Right → Left").length).toBeGreaterThan(0);
    await user.click(
      screen.getByRole("button", { name: /shuffle locations/i }),
    );
    expect(screen.getByText(/50.0%/)).toBeInTheDocument();
  });
  it("explains why delay alone is not proof of memory", async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.click(screen.getByRole("button", { name: "Yes" }));
    expect(
      screen.getByText(/Delay is not the same as a recoverable record/i),
    ).toBeInTheDocument();
  });
});

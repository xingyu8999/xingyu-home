import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const themeMock = vi.hoisted(() => ({
  setTheme: vi.fn(),
  state: { resolvedTheme: "dark" },
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: themeMock.state.resolvedTheme,
    setTheme: themeMock.setTheme,
  }),
}));

import ThemeToggle from "@/components/ThemeToggle";

describe("ThemeToggle", () => {
  it("announces current mode and switches to light from dark", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = await screen.findByRole("button", { name: "切换亮色主题" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveTextContent("亮色");

    await user.click(button);
    await waitFor(() => expect(themeMock.setTheme).toHaveBeenCalledWith("light"));
  });
});

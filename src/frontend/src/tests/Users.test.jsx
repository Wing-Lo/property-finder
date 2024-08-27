import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Users from "../components/Users"; // Adjust import path as necessary

// Mock modules
vi.mock("react-toastify", () => ({
    toast: {
        error: vi.fn(),
        success: vi.fn()
    }
}));

// Mock fetch
global.fetch = vi.fn();

// Test case for loading state
describe("Users Component", () => {
    it("shows a loader when fetching data", () => {
        global.fetch.mockImplementation(
            () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: () => [] }), 100))
        );

        render(
            <MemoryRouter>
                <Users isAgentPage={false} loggedInUser={{ token: "valid-token" }} />
            </MemoryRouter>
        );

        expect(screen.getByLabelText("Loading Property...")).toBeInTheDocument();
    });
});

it("renders agent-specific content correctly when isAgentPage is true", async () => {
    global.fetch.mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => [{ _id: "1", firstName: "John", lastName: "Doe", profilePic: "", isAgent: true }]
        })
    );

    render(
        <MemoryRouter>
            <Users isAgentPage={true} loggedInUser={{ token: "valid-token" }} />
        </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Contact Agent")).toBeInTheDocument();
    });
});

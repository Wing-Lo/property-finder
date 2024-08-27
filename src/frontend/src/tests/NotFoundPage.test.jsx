import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";

// Mock the useNavigate hook from react-router-dom
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

describe("NotFoundPage", () => {
    it("renders the NotFoundPage component correctly", () => {
        render(
            <MemoryRouter>
                <NotFoundPage />
            </MemoryRouter>
        );

        // Check if the 404 title is rendered
        expect(screen.getByText("404 Not Found")).toBeInTheDocument();

        // Check if the warning message is rendered
        expect(screen.getByText("Warning")).toBeInTheDocument();

        // Check if the page does not exist message is rendered
        expect(screen.getByText("This page does not exist")).toBeInTheDocument();

        // Check if the button is rendered
        expect(screen.getByRole("button", { name: /Go Back/i })).toBeInTheDocument();
    });

    it("navigates to the home page when the button is clicked", () => {
        render(
            <MemoryRouter>
                <NotFoundPage />
            </MemoryRouter>
        );

        // Click the "Go Back" button
        fireEvent.click(screen.getByRole("button", { name: /Go Back/i }));

        // Verify if navigate was called with the correct path
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});

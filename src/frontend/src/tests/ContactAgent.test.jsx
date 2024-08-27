import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import ContactAgent from "../components/ContactAgent"; // Adjust the import path as necessary

// Mock `useNavigate` function
vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: vi.fn() // Directly mock `useNavigate`
    };
});

describe("ContactAgent Component", () => {
    // Helper function to render with necessary providers
    const renderContactAgent = () => {
        render(
            <MemoryRouter>
                <ContactAgent />
            </MemoryRouter>
        );
    };

    it("renders the title and paragraph correctly", () => {
        renderContactAgent();

        expect(screen.getByText("Looking to sell?")).toBeInTheDocument();
        expect(screen.getByText("Contact our local property agent for a free consultation.")).toBeInTheDocument();
    });

    it("navigates to /agent when the View Agents button is clicked", () => {
        const navigate = vi.fn(); // Create a mock function for `navigate`
        // Set up the mock for `useNavigate`
        useNavigate.mockReturnValue(navigate);

        renderContactAgent();

        fireEvent.click(screen.getByText("View Agents"));
        expect(navigate).toHaveBeenCalledWith("/agent");
    });

    it("opens the email client with the correct address when the Contact Us button is clicked", () => {
        // Store the original window.location.href
        const originalHref = window.location.href;
        delete window.location;
        window.location = { href: "" };

        renderContactAgent();

        fireEvent.click(screen.getByText("Contact Us"));
        expect(window.location.href).toBe("mailto:no-reply@propertyfinder.com");

        // Restore the original window.location.href
        window.location.href = originalHref;
    });
});

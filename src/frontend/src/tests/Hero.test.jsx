import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";

// Mock the `react-router-dom` module
vi.mock("react-router-dom", () => {
    // Mock the `useNavigate` hook
    const navigate = vi.fn();

    return {
        ...vi.importActual("react-router-dom"), // Import the actual implementation
        useNavigate: () => navigate,
        MemoryRouter: ({ children }) => <div>{children}</div> // Simple mock for MemoryRouter
    };
});

describe("Hero Component", () => {
    // Helper function to render with necessary providers
    const renderHero = (props = {}) => {
        render(
            <MemoryRouter>
                <Hero {...props} />
            </MemoryRouter>
        );
    };

    it("renders the title and subtitle correctly", () => {
        renderHero();

        expect(screen.getByText("Make your next move")).toBeInTheDocument();
        expect(
            screen.getByText(
                "Discover your perfect home with ease. Whether you're ready to buy or rent, we have the ideal property waiting for you. Take the next step in your journey and explore options tailored to your needs. Click below to find your dream home today."
            )
        ).toBeInTheDocument();
    });

    it("renders the title and subtitle with provided props", () => {
        const title = "Find Your New Home";
        const subtitle =
            "Explore the best properties in the market. Whether buying or renting, we have the perfect place for you.";

        renderHero({ title, subtitle });

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(subtitle)).toBeInTheDocument();
    });

    it("navigates to /buy when the Buy button is clicked", () => {
        const navigate = vi.mocked(useNavigate)();

        renderHero();

        fireEvent.click(screen.getByText("Buy"));
        expect(navigate).toHaveBeenCalledWith("/buy");
    });

    it("navigates to /rent when the Rent button is clicked", () => {
        const navigate = vi.mocked(useNavigate)();

        renderHero();

        fireEvent.click(screen.getByText("Rent"));
        expect(navigate).toHaveBeenCalledWith("/rent");
    });

    it("has the correct background image style", () => {
        renderHero();

        const sectionElement = screen.getByTestId("hero-section");
        expect(sectionElement).toHaveStyle(
            "backgroundImage: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AincCKlvJ3KUx5oymiqxWTS8DSSt0ZGXHnTXS3zXtMvmdc2Qt7xoyUD7eUFPCz19CZU&usqp=CAU')"
        );
    });
});

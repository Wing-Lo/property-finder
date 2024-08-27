import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Adjust the import path as necessary

// Mock `useNavigate` function
vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: vi.fn(),
        NavLink: ({ to, children, ...props }) => (
            <a href={to} {...props}>
                {children}
            </a>
        )
    };
});

describe("Navbar Component", () => {
    const renderNavbar = (loggedInUser = null, setLoggedInUser = vi.fn()) => {
        render(
            <MemoryRouter>
                <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
            </MemoryRouter>
        );
    };

    it("renders the Navbar with proper links and buttons", () => {
        renderNavbar();

        // Check that the Navbar title is rendered
        expect(screen.getByText("PROPERTY FINDER")).toBeInTheDocument();

        // Check for static links
        expect(screen.getByText("HOME")).toBeInTheDocument();
        expect(screen.getByText("BUY")).toBeInTheDocument();
        expect(screen.getByText("RENT")).toBeInTheDocument();
        expect(screen.getByText("AGENT")).toBeInTheDocument();

        // Check for buttons
        expect(screen.getByText("Sign up")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it("navigates to the home page when the title is clicked", () => {
        const navigate = vi.fn();
        useNavigate.mockReturnValue(navigate);

        renderNavbar();

        fireEvent.click(screen.getByText("PROPERTY FINDER"));
        expect(navigate).toHaveBeenCalledWith("/");
    });

    it("toggles the mobile menu on button click", () => {
        renderNavbar();

        // Check initial state of the mobile menu
        const mobileMenu = screen.getByRole("navigation").querySelector("#navbarBasicExample");
        expect(mobileMenu).not.toHaveClass("is-active");

        // Click the mobile menu button to open it
        fireEvent.click(screen.getByRole("button", { name: /menu/i }));
        expect(mobileMenu).toHaveClass("is-active");

        // Click the mobile menu button again to close it
        fireEvent.click(screen.getByRole("button", { name: /menu/i }));
        expect(mobileMenu).not.toHaveClass("is-active");
    });

    it("shows the correct links and buttons based on loggedInUser prop", () => {
        // Test for user as agent
        const loggedInUserAgent = { user: { isAgent: true, isAdmin: false } };
        renderNavbar(loggedInUserAgent);

        // Use queryAllByText to handle potential multiple elements
        expect(screen.queryAllByText("MY LISTINGS")).toHaveLength(1);
        expect(screen.queryAllByText("MANAGE USER")).toHaveLength(0);
        expect(screen.queryAllByText("MY PROPERTIES")).toHaveLength(1);

        // Test for user as admin
        const loggedInUserAdmin = { user: { isAgent: false, isAdmin: true } };
        renderNavbar(loggedInUserAdmin);

        expect(screen.queryAllByText("MANAGE USER")).toHaveLength(1);
        expect(screen.queryAllByText("MY PROPERTIES")).toHaveLength(2);
        expect(screen.queryAllByText("MY LISTINGS")).toHaveLength(1);

        // Test for logged-in user
        const loggedInUser = { user: { isAgent: false, isAdmin: false } };
        renderNavbar(loggedInUser);

        expect(screen.queryAllByText("MY LISTINGS")).toHaveLength(1);
        expect(screen.queryAllByText("MANAGE USER")).toHaveLength(1);
        expect(screen.queryAllByText("MY PROPERTIES")).toHaveLength(3);
        expect(screen.queryAllByText("Log out")).toHaveLength(3);
        expect(screen.queryAllByText("Sign up")).toHaveLength(0);

        // Test for no logged-in user
        renderNavbar(null);

        expect(screen.queryAllByText("MY LISTINGS")).toHaveLength(1);
        expect(screen.queryAllByText("MANAGE USER")).toHaveLength(1);
        expect(screen.queryAllByText("MY PROPERTIES")).toHaveLength(3);
        expect(screen.queryAllByText("Sign up")).toHaveLength(1);
        expect(screen.queryAllByText("Login")).toHaveLength(1);
    });

    it("handles logout correctly", () => {
        const navigate = vi.fn();
        const setLoggedInUser = vi.fn();
        localStorage.setItem("loggedInUser", "user");
        sessionStorage.setItem("loggedInUser", "user");

        useNavigate.mockReturnValue(navigate);

        renderNavbar({ user: { isAgent: false, isAdmin: false } }, setLoggedInUser);

        fireEvent.click(screen.getByText("Log out"));
        expect(localStorage.getItem("loggedInUser")).toBe(null);
        expect(sessionStorage.getItem("loggedInUser")).toBe(null);
        expect(setLoggedInUser).toHaveBeenCalledWith("");
        expect(navigate).toHaveBeenCalledWith("/");
    });
});

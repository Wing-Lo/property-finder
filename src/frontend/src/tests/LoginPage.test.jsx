import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginPage from "../pages/LoginPage";

// Mock the necessary modules
vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn()
}));

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}));

const mockSetLoggedInUser = vi.fn();

describe("LoginPage", () => {
    it("renders form fields and button correctly", () => {
        render(<LoginPage loggedInUser={null} setLoggedInUser={mockSetLoggedInUser} />);

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Remember me/i)).toBeInTheDocument();
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
    });

    it("shows validation errors when form is submitted with empty fields", async () => {
        render(<LoginPage loggedInUser={null} setLoggedInUser={mockSetLoggedInUser} />);

        fireEvent.click(screen.getByText(/Login/i));

        expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
    });

    it("handles successful login", async () => {
        const mockNavigate = vi.fn();
        useNavigate.mockReturnValue(mockNavigate);

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ id: 1, email: "test@example.com" })
            })
        );

        render(<LoginPage loggedInUser={null} setLoggedInUser={mockSetLoggedInUser} />);

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });

        fireEvent.click(screen.getByText(/Login/i));

        await waitFor(() => {
            expect(mockSetLoggedInUser).toHaveBeenCalledWith({ id: 1, email: "test@example.com" });
            expect(toast.success).toHaveBeenCalledWith("Successfully logged in");
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    it("handles login failure", async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: "Invalid credentials" })
            })
        );

        render(<LoginPage loggedInUser={null} setLoggedInUser={mockSetLoggedInUser} />);

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });

        fireEvent.click(screen.getByText(/Login/i));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
        });
    });
});

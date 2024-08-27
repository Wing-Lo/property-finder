import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "../components/Footer";

describe("Footer Component", () => {
    it("renders correctly with current year", () => {
        render(<Footer />);

        const currentYear = new Date().getFullYear();
        expect(screen.getByText(`Property Finder © ${currentYear}`)).not.toBeNull();

        expect(screen.getByText("Property For Sale")).not.toBeNull();
        expect(screen.getByText("Property For Rent")).not.toBeNull();
    });

    it("contains correct links and text", () => {
        render(<Footer />);

        const saleLink = screen.getByText("Property For Sale");
        const rentLink = screen.getByText("Property For Rent");

        expect(saleLink).toHaveAttribute("href", "/buy");
        expect(rentLink).toHaveAttribute("href", "/rent");
    });
});

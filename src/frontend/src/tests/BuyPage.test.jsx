import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For the extended matchers
import { describe, it, expect, vi } from "vitest";
import BuyPage from "../pages/BuyPage";

// Mock the FeatureProperties component
vi.mock("../components/FeatureProperties", () => ({
    __esModule: true,
    default: ({ sellOrRent }) => <div>{`FeatureProperties component: sellOrRent=${sellOrRent}`}</div>
}));

describe("BuyPage", () => {
    it('renders FeatureProperties component with sellOrRent prop set to "sell"', () => {
        // Render the BuyPage component
        render(<BuyPage />);

        // Check if the FeatureProperties component is rendered with the correct prop
        expect(screen.getByText("FeatureProperties component: sellOrRent=sell")).toBeInTheDocument();
    });
});

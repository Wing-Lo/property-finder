import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For extended matchers
import { describe, it, expect, vi } from "vitest";
import HomePage from "../pages/HomePage";

// Mock the components
vi.mock("../components/Hero", () => ({
    __esModule: true,
    default: () => <div data-testid="hero">Hero Component</div>
}));

vi.mock("../components/FeatureProperties", () => ({
    __esModule: true,
    default: (props) => (
        <div data-testid="feature-properties">
            {`FeatureProperties Component: isHome=${props.isHome}, sellOrRent=${props.sellOrRent}`}
        </div>
    )
}));

vi.mock("../components/ContactAgent", () => ({
    __esModule: true,
    default: (props) => <div data-testid="contact-agent">{`ContactAgent Component: isHome=${props.isHome}`}</div>
}));

describe("HomePage", () => {
    it("renders Hero component", () => {
        render(<HomePage />);

        const heroElement = screen.getByTestId("hero");
        expect(heroElement).toBeInTheDocument();
        expect(heroElement).toHaveTextContent("Hero Component");
    });

    it("renders FeatureProperties components with correct props", () => {
        render(<HomePage />);

        const featurePropertiesElements = screen.getAllByTestId("feature-properties");

        expect(featurePropertiesElements).toHaveLength(2);

        expect(featurePropertiesElements[0]).toBeInTheDocument();
        expect(featurePropertiesElements[0]).toHaveTextContent(
            "FeatureProperties Component: isHome=true, sellOrRent=sell"
        );

        expect(featurePropertiesElements[1]).toBeInTheDocument();
        expect(featurePropertiesElements[1]).toHaveTextContent(
            "FeatureProperties Component: isHome=true, sellOrRent=rent"
        );
    });

    it("renders ContactAgent component", () => {
        render(<HomePage />);

        const contactAgentElement = screen.getByTestId("contact-agent");
        expect(contactAgentElement).toBeInTheDocument();
        expect(contactAgentElement).toHaveTextContent("ContactAgent Component: isHome=true");
    });
});

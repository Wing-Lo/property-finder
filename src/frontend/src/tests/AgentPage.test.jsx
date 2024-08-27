import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // for the extended matchers
import { describe, it, expect, vi } from "vitest";
import AgentPage from "../pages/AgentPage";

// Mock the Users component
vi.mock("../components/Users", () => ({
    __esModule: true,
    default: ({ isAgentPage }) => <div>{`Users component: isAgentPage=${isAgentPage}`}</div>
}));

describe("AgentPage", () => {
    it("renders Users component with isAgentPage prop set to true", () => {
        // Render the AgentPage component
        render(<AgentPage />);

        // Check if the Users component is rendered with the correct prop
        expect(screen.getByText("Users component: isAgentPage=true")).toBeInTheDocument();
    });
});

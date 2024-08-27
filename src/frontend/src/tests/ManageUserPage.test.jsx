import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ManageUserPage from "../pages/ManageUserPage";

// Mock Users component
vi.mock("../components/Users", () => ({
    __esModule: true,
    default: () => <div>Mock Users Component</div>
}));

describe("ManageUserPage", () => {
    it("renders Users component with loggedInUser prop", () => {
        const loggedInUser = { name: "John Doe", id: 1 };

        render(<ManageUserPage loggedInUser={loggedInUser} />);

        // Check if the Users component is rendered
        expect(screen.getByText("Mock Users Component")).toBeInTheDocument();
    });
});

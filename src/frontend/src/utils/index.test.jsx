import { describe, it, expect, vi } from "vitest";
import { convertToBase64, formatToAUD } from "."; // Adjust the import path

describe("convertToBase64", () => {
    it("should convert a file to base64 string", async () => {
        const file = new Blob(["hello"], { type: "text/plain" });
        const base64 = await convertToBase64(file);

        expect(base64).toMatch(/^data:text\/plain;base64,/); // Check if it starts with data URL for text/plain
    });

    it("should reject with an error if FileReader fails", async () => {
        const file = new Blob(["hello"], { type: "text/plain" });

        const fileReaderMock = vi.spyOn(window, "FileReader").mockImplementation(() => {
            const mockFileReader = {
                readAsDataURL: vi.fn(),
                onload: null,
                onerror: null
            };
            setTimeout(() => mockFileReader.onerror(new Error("FileReader error")), 0);
            return mockFileReader;
        });

        await expect(convertToBase64(file)).rejects.toThrow("FileReader error");
        fileReaderMock.mockRestore();
    });
});

describe("formatToAUD", () => {
    it("should format number to AUD currency format", () => {
        expect(formatToAUD(1234)).toBe("$1,234");
        expect(formatToAUD(0)).toBe("$0");
        expect(formatToAUD(1234567.89)).toBe("$1,234,568");
    });
});

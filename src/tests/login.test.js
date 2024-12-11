import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../components/login"; // Adjust the path based on your file structure
import { useNavigate } from "react-router-dom";

// Mocking react-router-dom's useNavigate hook
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Login Component", () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
    useNavigate.mockReturnValue(mockNavigate);
  });

  test("logs in successfully with valid credentials", async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "johnsmith@ssh.ac.uk" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "John_s2204" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/Logged in successfully!/i)).toBeInTheDocument();
    });


    // Verify session storage
    expect(sessionStorage.getItem("hasVisited")).toBe("true");
  });

  test("shows error for incorrect password", async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "johnsmith@ssh.ac.uk" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/incorrect password\. please try again\./i)
      ).toBeInTheDocument();
    });

    // Ensure navigation does not occur
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("shows error for email not found", async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "nonexistent@ssh.ac.uk" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "somepassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/email not found\. please check your email address\./i)
      ).toBeInTheDocument();
    });

    // Ensure navigation does not occur
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("shows error when email is empty", async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "somepassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/email cannot be empty/i)).toBeInTheDocument();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("shows error when password is empty", async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "johnsmith@ssh.ac.uk" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/password cannot be empty/i)).toBeInTheDocument();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

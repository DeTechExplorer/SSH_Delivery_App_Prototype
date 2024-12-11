import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "../components/homepage"; // Adjust this to the correct path

test('navigates to Categories page', async () => {
  render(
    <Router>
      <HomePage />
    </Router>
  );

  // Step 1: Find and click the Categories button
  const categoriesButton = screen.getByRole('button', { name: /Categories/i });
  fireEvent.click(categoriesButton);

  // Step 2: Wait for the Categories page to appear 
  const categoriesDropdown = await screen.findByText(/Bakery/i); // Replace with actual category text

  // Verify that the Categories page is rendered
  expect(categoriesDropdown).toBeInTheDocument();
});
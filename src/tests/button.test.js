import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../components/homepage'; // Adjust the import according to your file structure
import { BrowserRouter as Router } from 'react-router-dom'; // Wrap with Router

test('clicking the cart button redirects to the cart page', () => {
  render(
    <Router>
      <HomePage />
    </Router>
  );

  // Get the cart button by its test ID
  const cartButton = screen.getByTestId('cart-btn');

  // Simulate a click on the cart button
  fireEvent.click(cartButton);

  // Expect the page to redirect to the cart page
  expect(window.location.pathname).toBe('/individualCart');
});

import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import productsData from "../components/productsData"; 
import React from "react";

// Sample data for product pages
const productData = [
  { id: "breakfast-001", name: "Fresh Croissant", category: "breakfast" },
  { id: "dairy-004", name: "Butter", category: "dairy" },
  { id: "fruits-004", name: "Strawberry", category: "fruits-vegetables" },
];

describe("Cart Management with Multiple Product Pages", () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  // Reusable test for adding to cart across different product pages
  const addToCartTest = async (product) => {
    render(
      <Router>
        <productsData productId={product.id} /> {/* Adjust this to render a specific product page */}
      </Router>
    );

    // Find the "Add to Cart" button using getByText
    const addToCartButton = await screen.findByRole('button', { name: /Add to Cart/i });
    const cartButton = screen.getByTestId("cart-btn"); // Cart button to check the count

    // Simulate clicking the "Add to Cart" button for the specific product
    fireEvent.click(addToCartButton);

    // Verify the cart in localStorage
    const cart = JSON.parse(localStorage.getItem("cart"));
    expect(cart).toEqual([{ id: product.id, quantity: 1 }]); // Ensure cart updates with the correct item

    // Check the cart button reflects the correct count 
    expect(cartButton.textContent).toBe("1");
  };

  // Run the test for each product dynamically
  productData.forEach((product) => {
    test(`adds ${product.name} to the cart and updates localStorage`, () => {
      addToCartTest(product);
    });
  });
});

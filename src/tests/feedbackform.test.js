import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FeedbackForm from '../components/feedback';

test('renders feedback form and submits feedback successfully', async () => {
  render(
    <MemoryRouter>
      <FeedbackForm />
    </MemoryRouter>
  );

  // Verify that the form is rendered
  expect(screen.getByText(/Please take a few minutes to do the feedback/i)).toBeInTheDocument();

  // Verify the submit button is initially disabled
  const submitButton = screen.getByRole('button', { name: /Submit Feedback/i });
  expect(submitButton).toBeDisabled();

  // Select a star rating
  const star = screen.getAllByText('★')[2]; // Select the 3rd star
  fireEvent.click(star);

  // Verify the submit button is now enabled
  expect(submitButton).not.toBeDisabled();

  // Fill in the suggestions textarea
  const textarea = screen.getByPlaceholderText(/Your suggestions here.../i);
  fireEvent.change(textarea, { target: { value: 'Great service!' } });
  expect(textarea.value).toBe('Great service!');

  // Submit the form
  fireEvent.click(submitButton);

  // Verify the success toast message appears
  const successToast = await waitFor(() =>
    screen.getByText(/Feedback Submitted Successfully!/i)
  );
  expect(successToast).toBeInTheDocument();
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationModal from '../Confirmacao/index';

test('renders ConfirmationModal with provided props', () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  const props = {
    isShow: true,
    title: 'Test Title',
    message: 'Test Message',
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel,
  };

  render(<ConfirmationModal {...props} />);

  
  expect(screen.getByText(props.title)).toBeInTheDocument();
  expect(screen.getByText(props.message)).toBeInTheDocument();


  const confirmButton = screen.getByText('Confirmar');
  const cancelButton = screen.getByText('Cancelar');
  expect(confirmButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();

  
  fireEvent.click(confirmButton);
  fireEvent.click(cancelButton);

  
  expect(mockOnConfirm).toHaveBeenCalled();
  expect(mockOnCancel).toHaveBeenCalled();
});

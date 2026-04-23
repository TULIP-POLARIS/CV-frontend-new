import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ResetPasswordScreen from '../../screens/Auth/ResetPasswordScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

const mockNavigation = {
  navigate: mockNavigate,
  goBack: mockGoBack,
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
  useRoute: () => ({ params: { email: 'test@gmail.com' } }),
}));

jest.mock('../../hooks/useTranslation', () => ({
  useTranslation: () => ({ t: (key: string) => key, language: 'en' }),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

global.fetch = jest.fn();

describe('ResetPasswordScreen', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders new password and confirm password fields', () => {
    const { getByPlaceholderText } = render(
      <ResetPasswordScreen
        navigation={mockNavigation as any}
        route={{ params: { email: 'test@gmail.com' } } as any}
      />
    );
    expect(getByPlaceholderText('Enter new password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm new password')).toBeTruthy();
  });

  it('shows error when password is too short', async () => {
    const { getByPlaceholderText, getAllByText, getByText } = render(
      <ResetPasswordScreen
        navigation={mockNavigation as any}
        route={{ params: { email: 'test@gmail.com' } } as any}
      />
    );
    fireEvent.changeText(getByPlaceholderText('Enter new password'), '123');
    fireEvent.changeText(getByPlaceholderText('Confirm new password'), '123');
    const buttons = getAllByText('Reset Password');
    fireEvent.press(buttons[buttons.length - 1]);
    await waitFor(() => {
      expect(getByText('Password must be at least 8 characters.')).toBeTruthy();
    });
  });

  it('shows error when passwords do not match', async () => {
    const { getByPlaceholderText, getAllByText, getByText } = render(
      <ResetPasswordScreen
        navigation={mockNavigation as any}
        route={{ params: { email: 'test@gmail.com' } } as any}
      />
    );
    fireEvent.changeText(getByPlaceholderText('Enter new password'), 'Password123!');
    fireEvent.changeText(getByPlaceholderText('Confirm new password'), 'Different123!');
    const buttons = getAllByText('Reset Password');
    fireEvent.press(buttons[buttons.length - 1]);
    await waitFor(() => {
      expect(getByText('Passwords do not match.')).toBeTruthy();
    });
  });

  xit('navigates to Login on successful reset', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: { get: () => 'application/json' },
      json: async () => ({ message: 'Success' }),
    });
    const { getByPlaceholderText, getAllByText } = render(
      <ResetPasswordScreen
        navigation={mockNavigation as any}
        route={{ params: { email: 'test@gmail.com' } } as any}
      />
    );
    fireEvent.changeText(getByPlaceholderText('Enter new password'), 'Password123!');
    fireEvent.changeText(getByPlaceholderText('Confirm new password'), 'Password123!');
    const buttons = getAllByText('Reset Password');
    fireEvent.press(buttons[buttons.length - 1]);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Login');
    });
  });

  xit('shows error on failed API call', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      headers: { get: () => 'application/json' },
      json: async () => ({ message: 'Invalid token' }),
    });
    const { getByPlaceholderText, getAllByText, getByText } = render(
      <ResetPasswordScreen
        navigation={mockNavigation as any}
        route={{ params: { email: 'test@gmail.com' } } as any}
      />
    );
    fireEvent.changeText(getByPlaceholderText('Enter new password'), 'Password123!');
    fireEvent.changeText(getByPlaceholderText('Confirm new password'), 'Password123!');
    const buttons = getAllByText('Reset Password');
    fireEvent.press(buttons[buttons.length - 1]);
    await waitFor(() => {
      expect(getByText('Invalid token')).toBeTruthy();
    });
  });

});
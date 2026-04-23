import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../../screens/Auth/LoginScreen';

const mockNavigate = jest.fn();
const mockReset = jest.fn();

const mockNavigation = {
  navigate: mockNavigate,
  reset: mockReset,
  goBack: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

jest.mock('../../hooks/useTranslation', () => ({
  useTranslation: () => ({ t: (key: string) => key, language: 'en' }),
}));

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
    isLoggedIn: false,
    token: null,
  }),
}));

global.fetch = jest.fn();

describe('LoginScreen', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders email and password fields', () => {
    const { getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );
    expect(getByPlaceholderText('login.emailPlaceholder')).toBeTruthy();
    expect(getByPlaceholderText('login.passwordPlaceholder')).toBeTruthy();
  });

  it('shows error when email is empty', async () => {
    const { getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );
    fireEvent.press(getByText('login.loginButton'));
    await waitFor(() => {
      expect(getByText('login.emailError')).toBeTruthy();
    });
  });

  it('shows error when password is empty', async () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );
    fireEvent.changeText(
      getByPlaceholderText('login.emailPlaceholder'),
      'test@gmail.com'
    );
    fireEvent.press(getByText('login.loginButton'));
    await waitFor(() => {
      expect(getByText('login.passwordError')).toBeTruthy();
    });
  });

  it('shows error for invalid email format', async () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );
    fireEvent.changeText(
      getByPlaceholderText('login.emailPlaceholder'),
      'notanemail'
    );
    fireEvent.press(getByText('login.loginButton'));
    await waitFor(() => {
      expect(getByText('login.emailError')).toBeTruthy();
    });
  });

  it('navigates to Register screen', () => {
    const { getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );
    fireEvent.press(getByText('login.createAccount'));
    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });

  it('navigates to ForgotPassword screen', () => {
    const { getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );
    fireEvent.press(getByText('login.forgotPassword'));
    expect(mockNavigate).toHaveBeenCalledWith('ForgotPassword');
  });

});
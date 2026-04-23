import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterScreen from '../../screens/Auth/RegisterScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

const mockNavigation = {
  navigate: mockNavigate,
  goBack: mockGoBack,
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

jest.mock('../../hooks/useTranslation', () => ({
  useTranslation: () => ({ t: (key: string) => key, language: 'en' }),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
    isLoggedIn: false,
    token: null,
  }),
}));

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));
import { Alert } from 'react-native';

global.fetch = jest.fn();

describe('RegisterScreen', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ─── RENDER TESTS ─────────────────────────────────────────────
  describe('Rendering', () => {

    it('renders first name field', () => {
      const { getByPlaceholderText } = render(
        <RegisterScreen navigation={mockNavigation as any} />
      );
      expect(getByPlaceholderText('register.firstNamePlaceholder')).toBeTruthy();
    });

    it('renders last name field', () => {
      const { getByPlaceholderText } = render(
        <RegisterScreen navigation={mockNavigation as any} />
      );
      expect(getByPlaceholderText('register.lastNamePlaceholder')).toBeTruthy();
    });

    it('renders email field', () => {
      const { getByPlaceholderText } = render(
        <RegisterScreen navigation={mockNavigation as any} />
      );
      expect(getByPlaceholderText('register.emailPlaceholder')).toBeTruthy();
    });

    it('renders password field', () => {
      const { getByPlaceholderText } = render(
        <RegisterScreen navigation={mockNavigation as any} />
      );
      expect(getByPlaceholderText('register.passwordPlaceholder')).toBeTruthy();
    });

    it('renders register button', () => {
      const { getByText } = render(
        <RegisterScreen navigation={mockNavigation as any} />
      );
      expect(getByText('register.registerButton')).toBeTruthy();
    });

    it('renders already have account button', () => {
      const { getByText } = render(
        <RegisterScreen navigation={mockNavigation as any} />
      );
      expect(getByText('register.alreadyHaveAccount')).toBeTruthy();
    });

    it('renders phone number field', () => {
      const { getByPlaceholderText } = render(
        <RegisterScreen navigation={mockNavigation as any} />
      );
      expect(getByPlaceholderText('register.phoneNumberPlaceholder')).toBeTruthy();
    });

    it('renders privacy switch', () => {
      const { getByRole } = render(
        <RegisterScreen navigation={mockNavigation as any} />
      );
      expect(getByRole('switch')).toBeTruthy();
    });

  });

  // ─── VALIDATION TESTS ─────────────────────────────────────────
  describe('Validation', () => {

    xit('shows alert error when fields are empty and button pressed', async () => {
      const { getByRole } = render(
        <RegisterScreen navigation={mockNavigation as any} />
      );

      // Enable privacy switch to make button active
      fireEvent(getByRole('switch'), 'valueChange', true);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'register.errorTitle',
          'register.errorFillAll'
        );
      });
    });

    xit('register button is disabled when privacy not accepted', () => {
      const { getByText } = render(
        <RegisterScreen navigation={mockNavigation as any} />
      );
      const button = getByText('register.registerButton').parent?.parent;
      expect(button?.props.accessibilityState?.disabled).toBe(true);
    });

    xit('register button becomes enabled when privacy accepted', async () => {
      const { getByRole, getByText } = render(
        <RegisterScreen navigation={mockNavigation as any} />
      );
      fireEvent(getByRole('switch'), 'valueChange', true);
      await waitFor(() => {
        const button = getByText('register.registerButton').parent?.parent;
        expect(button?.props.accessibilityState?.disabled).toBeFalsy();
      });
    });

  });

  // ─── NAVIGATION TESTS ─────────────────────────────────────────
  describe('Navigation', () => {

    it('navigates to Login when already have account pressed', () => {
      const { getByText } = render(
        <RegisterScreen navigation={mockNavigation as any} />
      );
      fireEvent.press(getByText('register.alreadyHaveAccount'));
      expect(mockNavigate).toHaveBeenCalledWith('Login');
    });

  });

  // ─── API TESTS ────────────────────────────────────────────────
  describe('API calls', () => {

    xit('calls API with correct data on valid form submit', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: { get: () => 'application/json' },
        json: async () => ({ message: 'Success' }),
      });

      const { getByPlaceholderText, getByText, getByRole } = render(
        <RegisterScreen navigation={mockNavigation as any} />
      );

      fireEvent.changeText(
        getByPlaceholderText('register.firstNamePlaceholder'), 'John'
      );
      fireEvent.changeText(
        getByPlaceholderText('register.lastNamePlaceholder'), 'Doe'
      );
      fireEvent.changeText(
        getByPlaceholderText('register.emailPlaceholder'), 'john@gmail.com'
      );
      fireEvent.changeText(
        getByPlaceholderText('register.passwordPlaceholder'), 'Password123!'
      );
      fireEvent(getByRole('switch'), 'valueChange', true);
      fireEvent.press(getByText('register.registerButton'));

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });

    xit('shows error message on failed registration', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        headers: { get: () => 'application/json' },
        json: async () => ({ message: 'Email already exists' }),
      });

      const { getByPlaceholderText, getByText, getByRole } = render(
        <RegisterScreen navigation={mockNavigation as any} />
      );

      fireEvent.changeText(
        getByPlaceholderText('register.firstNamePlaceholder'), 'John'
      );
      fireEvent.changeText(
        getByPlaceholderText('register.lastNamePlaceholder'), 'Doe'
      );
      fireEvent.changeText(
        getByPlaceholderText('register.emailPlaceholder'), 'john@gmail.com'
      );
      fireEvent.changeText(
        getByPlaceholderText('register.passwordPlaceholder'), 'Password123!'
      );
      fireEvent(getByRole('switch'), 'valueChange', true);
      fireEvent.press(getByText('register.registerButton'));

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'register.registrationFailed',
          'Email already exists'
        );
      });
    });

  });

});
import { renderHook, act } from '@testing-library/react-native';
import { useTranslation, setLanguage } from '../../hooks/useTranslation';

describe('useTranslation', () => {

  // Reset to English before each test
  beforeEach(() => {
    act(() => {
      setLanguage('en');
    });
  });

  // ─── ENGLISH TESTS ───────────────────────────────────────────
  describe('English (EN)', () => {

    it('returns correct login button text in English', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('login.loginButton')).toBe('Login');
    });

    it('returns correct register button text in English', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('register.registerButton')).toBe('Register now');
    });

    it('returns correct forgot password title in English', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('forgotPassword.title')).toBe('Forgot Password?');
    });

    it('returns correct settings logout text in English', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('settings.logout')).toBe('Logout');
    });

    it('returns correct privacy policy title in English', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('privacyPolicy.title')).toBe('Privacy Policy');
    });

    it('returns correct terms of service title in English', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('termsOfService.title')).toBe('Terms of Service');
    });

    it('returns correct cv select template text in English', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('cv.selectTemplate')).toBe('Select CV Template');
    });

    it('language code is en', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.language).toBe('en');
    });

  });

  // ─── FINNISH TESTS ───────────────────────────────────────────
  describe('Finnish (FI)', () => {

    beforeEach(() => {
      act(() => {
        setLanguage('fi');
      });
    });

    it('returns correct login button text in Finnish', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('login.loginButton')).toBe('Kirjaudu sisään');
    });

    it('returns correct register button text in Finnish', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('register.registerButton')).toBe('Rekisteröidy nyt');
    });

    it('returns correct forgot password title in Finnish', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('forgotPassword.title')).toBe('Unohditko salasanasi?');
    });

    it('returns correct settings logout text in Finnish', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('settings.logout')).toBe('Kirjaudu ulos');
    });

    it('returns correct privacy policy title in Finnish', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('privacyPolicy.title')).toBe('Tietosuojakäytäntö');
    });

    it('returns correct terms of service title in Finnish', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('termsOfService.title')).toBe('Käyttöehdot');
    });

    it('returns correct cv select template text in Finnish', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('cv.selectTemplate')).toBe('Valitse CV-malli');
    });

    it('language code is fi', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.language).toBe('fi');
    });

  });

  // ─── GERMAN/DUTCH TESTS ──────────────────────────────────────
  describe('German (DE)', () => {

    beforeEach(() => {
      act(() => {
        setLanguage('de');
      });
    });

    it('returns correct login button text in German', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('login.loginButton')).toBe('Anmelden');
    });

    it('returns correct register button text in German', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('register.registerButton')).toBe('Jetzt registrieren');
    });

    it('returns correct forgot password title in German', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('forgotPassword.title')).toBe('Passwort vergessen?');
    });

    it('returns correct settings logout text in German', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('settings.logout')).toBe('Abmelden');
    });

    it('returns correct privacy policy title in German', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('privacyPolicy.title')).toBe('Datenschutzrichtlinie');
    });

    it('returns correct terms of service title in German', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('termsOfService.title')).toBe('Nutzungsbedingungen');
    });

    it('returns correct cv select template text in German', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('cv.selectTemplate')).toBe('CV-Vorlage auswählen');
    });

    it('language code is de', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.language).toBe('de');
    });

  });

  // ─── LANGUAGE SWITCHING TESTS ─────────────────────────────────
  describe('Language Switching', () => {

    it('switches from English to Finnish correctly', () => {
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('login.loginButton')).toBe('Login');

      act(() => { setLanguage('fi'); });

      const { result: result2 } = renderHook(() => useTranslation());
      expect(result2.current.t('login.loginButton')).toBe('Kirjaudu sisään');
    });

    it('switches from Finnish to German correctly', () => {
      act(() => { setLanguage('fi'); });
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('login.loginButton')).toBe('Kirjaudu sisään');

      act(() => { setLanguage('de'); });

      const { result: result2 } = renderHook(() => useTranslation());
      expect(result2.current.t('login.loginButton')).toBe('Anmelden');
    });

    it('switches from German back to English correctly', () => {
      act(() => { setLanguage('de'); });
      const { result } = renderHook(() => useTranslation());
      expect(result.current.t('login.loginButton')).toBe('Anmelden');

      act(() => { setLanguage('en'); });

      const { result: result2 } = renderHook(() => useTranslation());
      expect(result2.current.t('login.loginButton')).toBe('Login');
    });

  });

});
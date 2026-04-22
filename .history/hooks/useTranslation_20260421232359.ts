export function useTranslation() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const cb = () => forceUpdate(n => n + 1);
    listeners.add(cb);
    return () => listeners.delete(cb);
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];

    for (const k of keys) {
      value = value?.[k];
      if (!value) return key;
    }

    return typeof value === 'string' ? value : key;
  }, [currentLanguage]); // 👈 این خیلی مهمه

  return { t, language: currentLanguage, setLanguage };
}
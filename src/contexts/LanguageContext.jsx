import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const LanguageContext = createContext();

// Available languages
const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'zh', name: '中文' },
  { code: 'ar', name: 'العربية' },
  { code: 'ru', name: 'Русский' },
  { code: 'sv', name: 'Svenska' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'pl', name: 'Polski' },
];

// Create a provider component
export const LanguageProvider = ({ children }) => {
  // Get the initial language from localStorage or default to English
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  // Get the language name from the code
  const getCurrentLanguageName = () => {
    const language = availableLanguages.find(lang => lang.code === currentLanguage);
    return language ? language.name : 'English';
  };

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    // In a real app, you would also update the document lang attribute
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  // Function to change the language
  const changeLanguage = (languageCode) => {
    if (availableLanguages.some(lang => lang.code === languageCode)) {
      setCurrentLanguage(languageCode);
    }
  };

  // Context value
  const value = {
    currentLanguage,
    currentLanguageName: getCurrentLanguageName(),
    availableLanguages,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

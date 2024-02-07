"use client"

import Cookies from 'js-cookie';
import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    const getLangFromURL = () => {
      // Assuming you're using React Router or a similar library for handling URL queries
      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get('lang'); // Extracts 'lang' query parameter
    };

    const userLang = getLangFromURL() || 'en'; // Default to English if no parameter is found
    if (userLang !== 'en') { // Assuming your page is in English by default
      const googleTranslateScript = document.createElement('script');
      googleTranslateScript.type = 'text/javascript';
      googleTranslateScript.async = true;
      googleTranslateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(googleTranslateScript);

      window.googleTranslateElementInit = async function() {
        await new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: userLang, // Only include the language you want
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
       
        Cookies.set('GoogleAccountsLocale_session', userLang, { expires: 999});
        Cookies.set('googtrans', `/en/${userLang}`, { expires: 999});
      };
    }
  }, []);

  return <div id="google_translate_element" style={{display: "none"}}></div>;
};

export default GoogleTranslate;

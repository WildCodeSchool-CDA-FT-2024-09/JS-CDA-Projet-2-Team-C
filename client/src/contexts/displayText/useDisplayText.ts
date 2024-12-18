import { useContext } from 'react';
import DisplayTextContext from './DisplayTextContext';

export const useDisplayText = () => {
  const context = useContext(DisplayTextContext);
  if (context === undefined) {
    throw new Error('useDisplayText must be used within a DisplayTextProvider');
  }

  const t = (label: string): string => {
    return context.displayText?.[label.toLowerCase()] || label;
  };

  return { ...context, t };
};

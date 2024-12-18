import { createContext, useState, useEffect, PropsWithChildren } from 'react';
import { useAuth } from '../auth/useAuth';
import { useDisplayTextQuery } from '../../generated/graphql-types';

type DisplayTextContextType = {
  displayText: Record<string, string> | null;
};

const DisplayTextContext = createContext<DisplayTextContextType | undefined>(
  undefined
);

export const DisplayTextProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  const [displayText, setDisplayText] = useState<Record<string, string> | null>(
    null
  );
  const { data, loading, error } = useDisplayTextQuery({ skip: !user });

  useEffect(() => {
    if (data && data.displayText) {
      const displayTextMap = data.displayText.reduce(
        (acc: Record<string, string>, item) => {
          acc[item.label] = item.textFR;
          return acc;
        },
        {}
      );
      setDisplayText(displayTextMap);
    }
  }, [data]);

  if (loading) return <p>Loading display text...</p>;
  if (error) return <p>Error loading display text</p>;

  return (
    <DisplayTextContext.Provider value={{ displayText }}>
      {children}
    </DisplayTextContext.Provider>
  );
};

export default DisplayTextContext;

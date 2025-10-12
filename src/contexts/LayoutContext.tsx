"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  ReactNode,
  RefObject,
} from "react";

// Layout configuration interface
interface LayoutConfig {
  // Hero reference for NavBar scroll detection (null means no hero section)
  heroRef: RefObject<HTMLDivElement | null> | null;

  // NavBar configuration
  showNavBar: boolean;

  // Footer configuration
  showFooter: boolean;
  footerVariant: "full" | "simple" | "minimal";
}

// Context value interface
interface LayoutContextValue {
  config: LayoutConfig;
  setHeroRef: (ref: RefObject<HTMLDivElement | null> | null) => void;
  setShowNavBar: (show: boolean) => void;
  setShowFooter: (show: boolean) => void;
  setFooterVariant: (variant: "full" | "simple" | "minimal") => void;
}

// Create context with undefined default
const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

// Provider component
export function LayoutProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<LayoutConfig>({
    heroRef: null,
    showNavBar: true,
    showFooter: true,
    footerVariant: "full",
  });

  const setHeroRef = useCallback(
    (ref: RefObject<HTMLDivElement | null> | null) => {
      setConfig(prev => ({ ...prev, heroRef: ref }));
    },
    []
  );

  const setShowNavBar = useCallback((show: boolean) => {
    setConfig(prev => ({ ...prev, showNavBar: show }));
  }, []);

  const setShowFooter = useCallback((show: boolean) => {
    setConfig(prev => ({ ...prev, showFooter: show }));
  }, []);

  const setFooterVariant = useCallback(
    (variant: "full" | "simple" | "minimal") => {
      setConfig(prev => ({ ...prev, footerVariant: variant }));
    },
    []
  );

  return (
    <LayoutContext.Provider
      value={{
        config,
        setHeroRef,
        setShowNavBar,
        setShowFooter,
        setFooterVariant,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

// Custom hook for consuming the context
export function useLayout() {
  const context = useContext(LayoutContext);

  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }

  return context;
}

// Optional: Hook for pages to easily configure their layout
export function useLayoutConfig(options?: {
  heroRef?: RefObject<HTMLDivElement | null> | null;
  showNavBar?: boolean;
  showFooter?: boolean;
  footerVariant?: "full" | "simple" | "minimal";
}) {
  const { setHeroRef, setShowNavBar, setShowFooter, setFooterVariant } =
    useLayout();

  // Apply configuration when options change
  if (options?.heroRef !== undefined) {
    setHeroRef(options.heroRef);
  }
  if (options?.showNavBar !== undefined) {
    setShowNavBar(options.showNavBar);
  }
  if (options?.showFooter !== undefined) {
    setShowFooter(options.showFooter);
  }
  if (options?.footerVariant !== undefined) {
    setFooterVariant(options.footerVariant);
  }

  return { setHeroRef, setShowNavBar, setShowFooter, setFooterVariant };
}

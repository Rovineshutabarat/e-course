"use client";

import dynamic from "next/dynamic";
import type * as React from "react";

const NextThemesProvider = dynamic(
  () => import("next-themes").then((e) => e.ThemeProvider),
  {
    ssr: false,
  }
);

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;

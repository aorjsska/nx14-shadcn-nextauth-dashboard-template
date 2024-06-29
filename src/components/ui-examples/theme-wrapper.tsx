// @components/theme-wrapper.tsx

"use client"

import { useConfig } from "@/hooks/use-config"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useEffect } from "react"
import { themes } from "@/registry/themes"

interface ThemeWrapperProps extends React.ComponentProps<"div"> {
    defaultTheme?: string
}

export function ThemeWrapper({
    defaultTheme,
    children,
    className,
  }: ThemeWrapperProps) {
    const { theme, resolvedTheme } = useTheme()
    const [config] = useConfig()
  
    useEffect(() => {
      const root = document.documentElement
      const activeTheme = themes.find(t => t.name === config.theme)
  
      if (activeTheme) {
        const currentMode = resolvedTheme === 'dark' ? 'dark' : 'light'
        
        Object.entries(activeTheme.cssVars[currentMode]).forEach(([key, value]) => {
          root.style.setProperty(`--${key}`, value)
        })
      }
    }, [theme, config.theme, resolvedTheme])
  
    return (
      <div
        className={cn(
          `theme-${defaultTheme || config.theme}`,
          "w-full",
          className
        )}
        style={
          {
            "--theme-color": `var(--${defaultTheme || config.theme})`,
            "--radius": `${defaultTheme ? 0.5 : config.radius}rem`,
          } as React.CSSProperties
        }
    >
      {children}
    </div>
  )

}
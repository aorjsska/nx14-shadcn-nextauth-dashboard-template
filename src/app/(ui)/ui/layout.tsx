import { Header } from "@/components/app/dashboard/header"
import { TailwindIndicator } from "@/components/ui-examples/tailwind-indicator"
import { ThemeWrapper } from "@/components/ui-examples/theme-wrapper"
import { uiConfig } from "@/config/ui"
import { Metadata, Viewport } from "next"
import { ThemeProvider } from "next-themes"

export const metadata: Metadata = {
    title: {
      default: uiConfig.name,
      template: `%s - ${uiConfig.name}`,
    },
    description: uiConfig.description,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
}

export const viewport: Viewport = {
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "white" },
      { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
}
  
interface UILayoutProps {
    children: React.ReactNode
}

export default function UILayout({ children }: UILayoutProps) {
    return (
      <>
        <div className="relative flex h-full flex-col px-4">
              <Header/>
              <div className="h-[calc(100%-64px)]">{children}</div>
          </div>
      </>
    )
}
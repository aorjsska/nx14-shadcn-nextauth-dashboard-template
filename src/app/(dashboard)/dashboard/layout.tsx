import { Header } from "@/components/dashboard/header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeWrapper } from "@/components/theme-wrapper"
import { dashboardConfig } from "@/config/dashboard"
import { Metadata, Viewport } from "next"
import { ThemeProvider } from "next-themes"

export const metadata: Metadata = {
    title: {
      default: dashboardConfig.name,
      template: `%s - ${dashboardConfig.name}`,
    },
    description: dashboardConfig.description,
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
  
interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <ThemeWrapper>
                    <div className="relative flex min-h-screen flex-col  px-4">
                        <Header/>
                        <div className="flex-1">{children}</div>
                    </div>
                    <TailwindIndicator />
                </ThemeWrapper>
            </ThemeProvider>
        </>
    )
}
import { Header } from "@/components/app/dashboard/header"
import { dashboardConfig } from "@/config/dashboard"
import { Metadata, Viewport } from "next"


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
        <div className="relative flex h-full flex-col px-4">
            <Header/>
            <div className="h-[calc(100%-64px)]">{children}</div>
        </div>
      </>
    )
}
import { dashboardConfig } from "@/config/dashboard";
import { MainNav } from "../main-nav";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Icons } from "../icons";
import { ThemeToggle } from "../theme-toggle";
import { ThemeCustomizer } from "../theme-customizer";

export function Header() {
    return (
      <header className="bg-background sticky top-0 z-40 w-full border-b">
        <div className="flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={dashboardConfig.mainNav} />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Link
                href={dashboardConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.gitHub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <Link
                href={dashboardConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.twitter className="h-5 w-5 fill-current" />
                  <span className="sr-only">Twitter</span>
                </div>
              </Link>
              <ThemeToggle />
              <ThemeCustomizer/>
            </nav>
          </div>
        </div>
      </header>
    )
  }
  
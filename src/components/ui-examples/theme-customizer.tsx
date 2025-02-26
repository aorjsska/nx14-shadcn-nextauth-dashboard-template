"use client"

import { CheckIcon, MoonIcon, Paintbrush, SunIcon } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { useTheme } from "next-themes";
import { useConfig } from "@/hooks/use-config";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { InfoCircledIcon, ResetIcon } from "@radix-ui/react-icons";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { themes } from "@/registry/themes";

// ThemeCustomizer props 타입을 ButtonProps를 확장하여 정의
interface ThemeCustomizerProps extends ButtonProps {
    // 여기에 ThemeCustomizer 특정한 추가 props가 있다면 정의할 수 있습니다.
    disableStyle?: boolean
    disableColor?: boolean
    disableRadius?: boolean
    disableMode?: boolean
}

export function ThemeCustomizer({
    disableStyle = false,
    children,
    ...props
}: ThemeCustomizerProps) {
    return (
        <div className="flex items-center space-x-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        {...props}
                    >
                        <Paintbrush className="mr-2 h-4 w-4" />
                        {children}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align="center"
                    className="z-40 w-[340px] rounded-[0.5rem] bg-white p-6 dark:bg-zinc-950"
                >
                    <Customizer disableStyle={disableStyle}/>
                </PopoverContent>
            </Popover>
        </div>
    )
}

interface CustomizerProps extends ThemeCustomizerProps {}

function Customizer({
    disableStyle=false,
    disableColor=false,
    disableRadius=false,
    disableMode=false
}: CustomizerProps) {
    const { setTheme: setMode, resolvedTheme: mode } = useTheme()
    const [config, setConfig] = useConfig()

    return (
        <div className="flex flex-col space-y-4 md:space-y-6">
            <div className="flex items-start pt-4 md:pt-0">
                <div className="space-y-1 pr-2">
                    <div className="font-semibold leading-none tracking-tight">
                        Customize
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Pick a style and color for your components.
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto rounded-[0.5rem]"
                    onClick={() => {
                        setConfig({
                            ...config,
                            theme: 'zinc',
                            radius: 0.5
                        })
                    }}
                >
                    <ResetIcon/>
                    <span className="sr-only">Reset</span>
                </Button>
            </div>
            <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
                {disableStyle ? undefined : (
                    <div className="space-y-1.5">
                        <div className="flex w-full items-center">
                            <Label className="text-xs">Style</Label>
                            <Popover>
                                <PopoverTrigger>
                                    <InfoCircledIcon className="ml-1 h-3 w-3"/>
                                    <span className="sr-only">About styles</span>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="space-y-3 rounded-[0.5rem] text-sm"
                                    side="right"
                                    align="start"
                                    alignOffset={-20}
                                >
                                    <p className="font-medium">
                                        What is the difference between the New York and Default style?
                                    </p>
                                    <p>
                                        A style comes with its own set of components, animations, icons and more.
                                    </p>
                                    <p>
                                        The <span className="font-medium">Default</span> style has
                                        larger inputs, uses lucide-react for icons and
                                        tailwindcss-animate for animations.
                                    </p>
                                    <p>
                                        The <span className="font-medium">New York</span> style ships
                                        with smaller buttons and cards with shadows. It uses icons
                                        from Radix Icons.
                                    </p>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <Button
                                variant={"outline"}
                                size={"sm"}
                                onClick={() => setConfig({...config, style: "default"})}
                                className={cn(
                                    config.style === "default" && "border-2 border-primary"
                                )}
                            >
                                Default
                            </Button>
                            <Button
                                variant={"outline"}
                                size={"sm"}
                                onClick={() => setConfig({...config, style: "new-york"})}
                                className={cn(
                                    config.style === "new-york" && "border-2 border-primary"
                                )}
                            >
                                New York
                            </Button>
                        </div>
                    </div>
                )}
                <div className="space-y-1.5">
                    <Label className="text-xs">Color</Label>
                    <div className="grid grid-cols-3 gap-2">
                        {themes.map((theme) => {
                            const isActive = config.theme === theme.name

                            return (
                                <Button
                                    variant={"outline"}
                                    size={"sm"}
                                    key={theme.name}
                                    onClick={() => {
                                        setConfig({
                                            ...config,
                                            theme: theme.name
                                        })
                                    }}
                                    className={cn(
                                        "justify-center",
                                        isActive && "border-2 border-primary"
                                    )}
                                    style={
                                        {
                                            "--theme-primary": `hsl(${
                                                theme?.activeColor[mode === "dark" ? "dark" : "light"]
                                            })`,
                                        } as React.CSSProperties
                                    }
                                >
                                    <span
                                        className={cn(
                                            "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]"
                                        )}
                                    >
                                        {isActive && <CheckIcon className="h-4 w-4 text-white"/>}
                                    </span>
                                    {theme.label}
                                </Button>
                            )
                        })}
                    </div>
                </div>
                <div className="space-y-1.5">
                    <Label className="text-xs">Radius</Label>
                    <div className="grid grid-cols-5 gap-2">
                        {["0", "0.3", "0.5", "0.75", "1.0"].map((value) => {
                            return (
                                <Button
                                    variant={"outline"}
                                    size="sm"
                                    key={value}
                                    onClick={() => {
                                        setConfig({
                                        ...config,
                                        radius: parseFloat(value),
                                        })
                                    }}
                                    className={cn(
                                        config.radius === parseFloat(value) &&
                                        "border-2 border-primary"
                                    )}
                                >
                                    {value}
                                </Button>
                            )
                        })}
                    </div>
                </div>
                <div className="space-y-1.5">
                    <Label className="text-xs">Mode</Label>
                    <div className="grid grid-cols-3 gap-2">
                        {(
                            <>
                                <Button
                                    variant={"outline"}
                                    size="sm"
                                    onClick={() => setMode("light")}
                                    className={cn(mode === "light" && "border-2 border-primary")}
                                >
                                <SunIcon className="mr-1 -translate-x-1" />
                                    Light
                                </Button>
                                <Button
                                    variant={"outline"}
                                    size="sm"
                                    onClick={() => setMode("dark")}
                                    className={cn(mode === "dark" && "border-2 border-primary")}
                                >
                                <MoonIcon className="mr-1 -translate-x-1" />
                                    Dark
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
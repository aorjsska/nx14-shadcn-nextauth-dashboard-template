import LogoutButton from "@/components/app/authentiaction/logout-button";
import { CProgress } from "@/components/ui-customs/c-progressbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
    return (
        <>
            <div className="h-full flex flex-col gap-2">
                Dashboard
                <div className="grid grid-cols-3 gap-4">
                    <HoverCard
                        cardTitle="Overall Verification Progress"
                        cardDescription=""
                        cardContent={
                            <div className="flex flex-col gap-4">
                                <h1 className="text-3xl font-semibold text-blue-500">
                                    72%
                                </h1>
                                <Progress value={72}/>
                            </div>
                        }
                    />
                    <HoverCard
                        cardTitle="Verification Status by Phase"
                        cardDescription=""
                        cardContent={
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center text-lg">
                                    <p>
                                        Requirement Analysis
                                    </p>
                                    <div className="p-2 bg-green-500 text-white text-base uppercase font-semibold py-0 rounded-full">
                                        Complete
                                    </div>
                                </div>
                                <Separator/>
                                <div className="flex justify-between items-center text-lg">
                                    <p>
                                        Design Verification
                                    </p>
                                    <div className="p-2 bg-green-500 text-white text-base uppercase font-semibold py-0 rounded-full">
                                        Complete
                                    </div>
                                </div>
                                <Separator/>
                                <div className="flex justify-between items-center text-lg">
                                    <p>
                                        Implementation Verification
                                    </p>
                                    <div className="p-2 bg-orange-500 text-white text-base uppercase font-semibold py-0 rounded-full">
                                        In Progress
                                    </div>
                                </div>
                                <Separator/>
                                <div className="flex justify-between items-center text-lg">
                                    <p>
                                        Integration Testing
                                    </p>
                                    <div className="p-2 bg-orange-500 text-white text-base uppercase font-semibold py-0 rounded-full">
                                        In Progress
                                    </div>
                                </div>
                                <Separator/>
                                <div className="flex justify-between items-center text-lg">
                                    <p>
                                        System Testing
                                    </p>
                                    <div className="p-2 bg-orange-500 text-white text-base uppercase font-semibold py-0 rounded-full">
                                        Pending
                                    </div>
                                </div>
                            </div>
                        }
                    />
                    <HoverCard
                        cardTitle="Last Verification Results"
                        cardDescription=""
                        cardContent={
                            <div className="flex flex-col gap-4">
                                <p className="text-lg">
                                    ADAS Module
                                </p>
                                <p className="text-muted-foreground">
                                    Passed 98/100 test cases
                                </p>
                                <div className="p-2 w-fit bg-green-500 text-white text-base uppercase font-semibold py-0 rounded-full">
                                    Pass
                                </div>
                                <Separator/>
                                <p className="text-lg">
                                    Infotainment System
                                </p>
                                <p className="text-muted-foreground">
                                    Failed 3 critical test cases
                                </p>
                                <div className="p-2 w-fit bg-red-500 text-white text-base uppercase font-semibold py-0 rounded-full">
                                    Fail
                                </div>
                                <Separator/>
                                <p className="text-lg">
                                    Engine Control Unit
                                </p>
                                <p className="text-muted-foreground">
                                    All 150 test cases passed
                                </p>
                                <div className="p-2 w-fit bg-green-500 text-white text-base uppercase font-semibold py-0 rounded-full">
                                    Pass
                                </div>
                            </div>
                        }
                    />
                    <HoverCard
                        cardTitle="Code Qaulity Metrics"
                        cardDescription=""
                        cardContent={
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center text-lg">
                                    <p>
                                        Cyclomatic Complexity
                                    </p>
                                    <p className="text-2xl text-red-500 font-semibold">
                                        18
                                    </p>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <p>
                                        Code Coverage
                                    </p>
                                    <p className="text-2xl text-red-500 font-semibold">
                                        89%
                                    </p>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <p>
                                        MISRA Compliance
                                    </p>
                                    <p className="text-2xl text-red-500 font-semibold">
                                        97%
                                    </p>
                                </div>
                            </div>
                        }
                    />
                    <HoverCard
                        cardTitle="Functional Safety Analysis"
                        cardDescription=""
                        cardContent={
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center text-lg">
                                    <p>
                                        ASIL-D Comliance
                                    </p>
                                    <p className="text-2xl text-red-500 font-semibold">
                                        94%
                                    </p>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <p>
                                        fault Tree Analysis
                                    </p>
                                    <div className="p-2 w-fit bg-orange-500 text-white text-base uppercase font-semibold py-0 rounded-full">
                                        In Progress
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <p>
                                        FMEA Completion
                                    </p>
                                    <p className="text-2xl text-red-500 font-semibold">
                                        88%
                                    </p>
                                </div>
                            </div>
                        }
                    />
                    <HoverCard
                        cardTitle="Cyberscurity Verification"
                        cardDescription=""
                        cardContent={
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center text-lg">
                                    <p>
                                        Threat Modeling
                                    </p>
                                    <div className="p-2 w-fit bg-green-500 text-white text-base uppercase font-semibold py-0 rounded-full">
                                        In Progress
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <p>
                                        Penetration Testing
                                    </p>
                                    <div className="p-2 w-fit bg-orange-500 text-white text-base uppercase font-semibold py-0 rounded-full">
                                        In Progress
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <p>
                                        Encryption Standards
                                    </p>
                                    <p className="text-2xl text-red-500 font-semibold">
                                        AES-256
                                    </p>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <p>
                                        Vulnerablilities Found
                                    </p>
                                    <p className="text-2xl text-red-500 font-semibold">
                                        3
                                    </p>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        </>
    )
}

interface HoverCardProps {
    cardTitle?: string | React.ReactNode
    cardDescription?: string | React.ReactNode
    cardContent?: React.ReactNode
}

function HoverCard({
    cardTitle="Card Title",
    cardDescription="Card Description",
    cardContent=<p>Card content goes here.</p>
}: HoverCardProps) {
    return (
        <Card className="transition-all duration-300 ease-in-out hover:-translate-y-0.5 shadow-md">
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
                <CardDescription>{cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                {cardContent}
            </CardContent>
        </Card>
    )
}
import LogoutButton from "@/components/app/authentiaction/logout-button";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    return (
        <>
            <div className="h-full bg-green-500">
                Dashboard
                <Button>
                    Theme Button
                </Button>
                <LogoutButton/>
            </div>
        </>
    )
}
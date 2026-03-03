"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Simple client-side auth check
        const isAuth = localStorage.getItem("adminAuth") === "true";

        if (!isAuth) {
            router.push("/admin-login");
        } else {
            setIsAuthorized(true);
        }
    }, [router]);

    // Show nothing (or a loader) while checking authorization to prevent flicker
    if (isAuthorized === null) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-widest uppercase">Verification...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

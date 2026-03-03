"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface EditProductButtonProps {
    productId: string;
}

export default function EditProductButton({ productId }: EditProductButtonProps) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check for adminAuth in localStorage (Client-side)
        const isAuth = localStorage.getItem("adminAuth") === "true";
        setIsAdmin(isAuth);
    }, []);

    if (!isAdmin) {
        return null;
    }

    return (
        <Link
            href={`/admin/edit-product/${productId}`}
            className="flex items-center gap-2 px-4 py-2 bg-admin-primary text-white rounded-lg text-sm font-bold hover:bg-admin-primary-dark transition-all shadow-sm"
        >
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Modifier ce produit
        </Link>
    );
}

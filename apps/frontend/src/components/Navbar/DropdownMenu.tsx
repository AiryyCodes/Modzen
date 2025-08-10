"use client";

import { useEffect, useRef, useState } from "react";
import DropdownArrow from "../Icons/DropdownArrow";
import Button from "../Button";
import { useUser } from "@/context/UserContext";
import Card from "../Card";
import { LogOut } from "lucide-react";

export default function DropdownMenu() {
    const { user, setUser } = useUser();

    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    if (!user) {
        return <></>;
    }

    const logout = async () => {
        try {
            const res = await fetch("/api/auth/logout", {
                credentials: "include",
                cache: "no-store",
            });

            if (!res.ok) {
                console.error("Logout failed");
                return;
            }

            setOpen(false);
            setUser(null);
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
                buttonRef.current?.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="relative inline-block text-left">
            <Button
                ref={buttonRef}
                label={user.username}
                variant="plain"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
                endElement={
                    <DropdownArrow
                        fill="white"
                        className={`w-3 h-auto transition-transform duration-200 ${open && "rotate-180"}`}
                    />
                }
            />

            <Card
                ref={menuRef}
                role="menu"
                aria-label="User menu"
                className={`
          absolute items-start right-0 mt-2 w-48 p-2 origin-top-right rounded-xl shadow-lg ring-1 ring-black/5
          transition-all duration-200 ease-out
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
        `}
            >
                <Button
                    role="menuitem"
                    onClick={() => logout()}
                    startElement={<LogOut size={18} />}
                    label="Logout"
                    variant="plain"
                    className="text-red-400 hover:bg-red-400 hover:text-white"
                />
            </Card>
        </div>
    );
}

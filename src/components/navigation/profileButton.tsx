"use client"

import handleSignOut from "@/actions/handleSignOut";
import { AccountBox } from "@mui/icons-material"
import { Menu, MenuItem } from "@mui/material"
import { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "../app/context/sessionProvider"

export default function ProfileButton({ session }: { session: Session | null }) {

    const image = session?.user?.image;

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const open = !!anchorEl

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <p></p>
            <button onClick={handleClick} className="h-full flex items-center mr-16">
                {image ? (
                    <img src={image} className="profilePic" />
                ) : (
                    <AccountBox className=" text-emerald-600 text-5xl"></AccountBox>
                )}

            </button>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleClose}><Link href="/app/settings">View Profile</Link></MenuItem>
                {!session?.user?.emailVerified && <MenuItem onClick={handleClose}><Link href="/verify">Verify Email</Link></MenuItem>}
                <MenuItem onClick={handleClose}><button onClick={handleSignOut} className="signOutButton">Sign Out</button></MenuItem>

            </Menu>
        </>
    )
}
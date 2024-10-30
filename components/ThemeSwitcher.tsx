"use client"
import React from 'react'
import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa";
import { GoSun } from "react-icons/go";

export default function ThemeSwitcher() {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <button
            onClick={() => currentTheme === "dark" ? setTheme('light') : setTheme("dark")}
            className=''>
            {currentTheme === "dark" ? <GoSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
        </button>
    )
}


import { Coins, FunnelPlus, LayoutDashboard, List, Wallet } from "lucide-react";
import loginBg from "./login-bg.avif";
import logo from "./money-manager-logo.png";

export const assets = {
    loginBg,
    logo,
}

export const SIDE_BAR_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/home",
    },
    {
        id: "02",
        label: "Category",
        icon: List,
        path: "/category",
    },
    {
        id: "03",
        label: "Income",
        icon: Wallet,
        path: "/income",
    },
    {
        id: "04",
        label: "Expense",
        icon: Coins,
        path: "/expense",
    },
    {
        id: "05",
        label: "Filters",
        icon: FunnelPlus,
        path: "/filter",
    }
]
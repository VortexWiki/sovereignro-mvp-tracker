import {
    LayoutDashboard,
    ListTree,
    Download,
    Settings,
} from "lucide-react";

import appLogo from "../assets/icons/app-logo.png";

const NAV_ITEMS = [
    { label: "Dashboard", icon: LayoutDashboard, page: "dashboard" },
    { label: "Monster List", icon: ListTree, page: "monsters" },
    { label: "Backup", icon: Download, page: "backup" },
    { label: "Settings", icon: Settings, page: "settings" },
];

export default function Sidebar({ currentPage, onNavigate }) {
    return (
        <aside className="sidebar">

            <div className="sidebar-header">
                <img src={appLogo} alt="SovereignRO MVP Tracker" className="sidebar-logo" />
            </div>

            <nav className="sidebar-nav">

                {NAV_ITEMS.map(({ label, icon: Icon, page }) => (

                    <button
                        key={label}
                        className={`sidebar-link${page && page === currentPage ? " sidebar-link--active" : ""}`}
                        onClick={page ? () => onNavigate(page) : undefined}
                        disabled={!page}
                    >

                        <Icon size={20} />

                        <span>{label}</span>

                    </button>

                ))}

            </nav>

        </aside>
    );
}

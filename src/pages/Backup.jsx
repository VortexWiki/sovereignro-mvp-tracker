import { useRef, useState } from "react";
import { Bell, Download, Upload, AlertTriangle } from "lucide-react";

import { exportBackupJson, importBackupJson } from "../utils/persistence";

// Manual JSON export/import, on top of the automatic browser (IndexedDB)
// save that already runs in the background. This is for: moving your
// tracker to a different browser/computer, or keeping an off-browser copy
// in case IndexedDB ever gets cleared (private browsing, "clear site data",
// browser reinstall, etc).
export default function Backup({ activeHunt, favorites, onRestore, onNavigate }) {
    const fileInputRef = useRef(null);
    const [importError, setImportError] = useState(null);
    const [importSuccess, setImportSuccess] = useState(false);

    function handleExport() {
        const json = exportBackupJson(activeHunt, favorites);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const stamp = new Date().toISOString().slice(0, 10);
        const a = document.createElement("a");
        a.href = url;
        a.download = `sovereignro-backup-${stamp}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function handlePickFile() {
        fileInputRef.current?.click();
    }

    function handleFileSelected(e) {
        const file = e.target.files?.[0];
        // Reset so picking the same file again still fires onChange.
        e.target.value = "";

        if (!file) {
            return;
        }

        setImportError(null);
        setImportSuccess(false);

        const reader = new FileReader();

        reader.onload = () => {
            try {
                const restored = importBackupJson(reader.result);
                const totalRestored = restored.activeHunt.length + restored.favorites.length;

                const confirmed = window.confirm(
                    `This will replace your current Active Hunt and Favorites with the ` +
                    `backup's ${totalRestored} monster(s). This can't be undone. Continue?`
                );

                if (!confirmed) {
                    return;
                }

                onRestore(restored);
                setImportSuccess(true);
            } catch (err) {
                setImportError(err.message || "Couldn't read this backup file.");
            }
        };

        reader.onerror = () => {
            setImportError("Couldn't read this file.");
        };

        reader.readAsText(file);
    }

    const totalTracked = activeHunt.length + favorites.length;

    return (
        <main className="page">

            <div className="page-content">

                <div className="page-header">

                    <h1>Backup</h1>

                    <button
                        className="icon-btn"
                        aria-label="Notification settings"
                        data-tooltip="Notification settings"
                        onClick={() => onNavigate?.("settings")}
                    >
                        <Bell size={19} />
                    </button>

                </div>

                <p className="backup-intro">
                    Your Active Hunt and Favorites are saved automatically in this
                    browser. Use this page to export a portable JSON copy, useful
                    for switching browsers/computers, or as a safety copy in case
                    this browser's storage ever gets cleared.
                </p>

                <div className="backup-section">

                    <h2 className="backup-section-title">Export</h2>

                    <p className="backup-section-text">
                        Currently tracking {totalTracked} monster{totalTracked === 1 ? "" : "s"}
                        {" "}({activeHunt.length} in Active Hunt, {favorites.length} in Favorites).
                    </p>

                    <button
                        type="button"
                        className="backup-action backup-action--primary"
                        onClick={handleExport}
                    >
                        <Download size={18} />
                        <span>Download backup JSON</span>
                    </button>

                </div>

                <div className="backup-section">

                    <h2 className="backup-section-title">Restore</h2>

                    <p className="backup-section-text">
                        Restoring a backup replaces everything currently in Active
                        Hunt and Favorites in this browser.
                    </p>

                    <button
                        type="button"
                        className="backup-action"
                        onClick={handlePickFile}
                    >
                        <Upload size={18} />
                        <span>Upload backup JSON</span>
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/json,.json"
                        onChange={handleFileSelected}
                        style={{ display: "none" }}
                    />

                    {importError && (

                        <p className="backup-message backup-message--error">
                            <AlertTriangle size={15} />
                            <span>{importError}</span>
                        </p>

                    )}

                    {importSuccess && (

                        <p className="backup-message backup-message--success">
                            Backup restored.
                        </p>

                    )}

                </div>

            </div>

        </main>
    );
}

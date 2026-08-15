import { Heart, ExternalLink } from "lucide-react";

export default function Footer() {
    return (
        <footer className="footer">

            <div className="footer-heart">

                <Heart size={18} className="footer-heart-icon" />

                <span>Enjoying the tracker?</span>

            </div>

            <div className="footer-divider" />

            <div className="footer-cta-text">
                Come join us on
                <span className="footer-arrow">→</span>
            </div>

            <a
                href="https://sovereignro.com"
                target="_blank"
                rel="noreferrer"
                className="footer-badge"
            >

                SOVEREIGNRO

                <ExternalLink size={16} />

            </a>

        </footer>
    );
}

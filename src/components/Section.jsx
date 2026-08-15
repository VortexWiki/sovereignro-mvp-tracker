export default function Section({ icon: Icon, iconColor, title, subtitle, children }) {
    return (
        <section className="section">

            <div className="section-header">

                {Icon && (
                    <Icon
                        size={20}
                        className="section-icon"
                        style={iconColor ? { color: iconColor } : undefined}
                    />
                )}

                <div>

                    <h2 className="section-title">
                        {title}
                    </h2>

                    {subtitle && (
                        <p className="section-subtitle">
                            {subtitle}
                        </p>
                    )}

                </div>

            </div>

            {children}

        </section>
    );
}

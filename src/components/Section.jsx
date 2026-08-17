// `action` is an optional element (e.g. a "Clear all" button) rendered at
// the far right of the header row, pushed there by section-header's
// justify-content: space-between — used by Active Hunt today, but any
// section can opt in.
export default function Section({ icon: Icon, iconColor, title, subtitle, children, action }) {
    return (
        <section className="section">

            <div className="section-header">

                <div className="section-header-main">

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

                {action}

            </div>

            {children}

        </section>
    );
}

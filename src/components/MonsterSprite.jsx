import { useState } from "react";

// Renders a monster sprite image, falling back to a placeholder glyph if the
// sprite is missing or fails to load.
export default function MonsterSprite({ sprite, name, size = 64 }) {
    const [failed, setFailed] = useState(false);

    const showImage = sprite && !failed;

    return (
        <div
            className={`monster-sprite${showImage ? "" : " monster-sprite--fallback"}`}
            style={{ width: size, height: size }}
        >
            {showImage ? (
                <img
                    src={sprite}
                    alt={name}
                    className="monster-sprite-img"
                    onError={() => setFailed(true)}
                />
            ) : (
                <span className="monster-sprite-fallback">👾</span>
            )}
        </div>
    );
}

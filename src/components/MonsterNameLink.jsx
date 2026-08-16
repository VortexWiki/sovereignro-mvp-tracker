// A monster's name, rendered as a link out to its Divine-Pride page when
// one is known. Reused everywhere a monster's name appears (TimerCard,
// FavoriteCard, Monster List, popup titles) so the "click name -> Divine-
// Pride" behavior stays consistent instead of being reimplemented per
// component.
//
// stopPropagation on click: several places this is used sit inside a
// larger clickable element (FavoriteCard's whole card moves the monster to
// Active Hunt on click, Monster List rows don't but future ones might) —
// without stopping propagation, clicking the name would both open Divine-
// Pride AND trigger whatever the parent's onClick does.
export default function MonsterNameLink({ mvp, className }) {
    if (!mvp.divinePrideUrl) {
        return <span className={className}>{mvp.name}</span>;
    }

    // monster-name-link is always added alongside whatever layout class is
    // passed in (or on its own, e.g. inside Monster List's row where the
    // layout class already lives on a wrapping div) — the CSS hover/reset
    // styling targets this one shared class instead of every possible
    // layout class name individually.
    const linkClassName = className ? `${className} monster-name-link` : "monster-name-link";

    return (
        <a
            href={mvp.divinePrideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            onClick={(e) => e.stopPropagation()}
        >
            {mvp.name}
        </a>
    );
}

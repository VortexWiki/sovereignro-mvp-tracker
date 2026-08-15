// Combined MVP + mini-boss list, tagged with `category` so callers can tell
// them apart (badge, filtering, etc). Shared between SearchBar and the
// Monster List page so both stay in sync with the same source data.
import mvps from "./mvps";
import minibosses from "./minibosses";

const allMonsters = [
    ...mvps.map((mvp) => ({ ...mvp, category: "mvp" })),
    ...minibosses.map((miniboss) => ({ ...miniboss, category: "miniboss" }))
];

export default allMonsters;

export function searchMonsters(monsters, query) {
    if (!query) return [];

    return monsters.filter((monster) =>
        monster.name.toLowerCase().includes(query.toLowerCase())
    );
}

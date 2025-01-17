console.log("test");

function getTeam() {
    fetch("json/teams.json")
    .then(response => response.json())
    .then(teams => {
        const teamsContainer = document.getElementById("teams");

        teams.forEach(team => {
            // Skapa en li för teamet
            const teamLi = document.createElement("li");
            teamLi.textContent = "Team Name: " + team.teamName;

            // Skapa en ul för heroes
            const heroesUl = document.createElement("ul");

            // Hämta heroes för aktuellt team
            fetch("json/heroes.json")
            .then(response => response.json())
            .then(heroes => {
                // Filtrera så vi bara får aktuella heroes för aktuellt team
                const teamHeroes = heroes.filter(hero => hero.teamId === team.teamId);

                teamHeroes.sort((a, b) => a.heroName.localeCompare(b.heroName));

                // Skapa li för varje hero och lägg till i heroesUl
                teamHeroes.forEach(hero => {
                    const heroLi = document.createElement("li");
                    heroLi.textContent = "Hero Name: " + hero.heroName;
                    heroesUl.appendChild(heroLi);
                });

                // Lägg till heroesUl till teamLi
                teamLi.appendChild(heroesUl);

                // Lägg till teamLi i teamsContainer
                teamsContainer.appendChild(teamLi);
            });
        });
    });
}

// Anropa funktionen
getTeam();

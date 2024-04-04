document.addEventListener("DOMContentLoaded", function() {
  // JavaScript code for the functionality
  let adminPassword = "tammu"; // Set the password to "tammu"

  document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const teamName = document.getElementById("teamName").value;
    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;
    const player3 = document.getElementById("player3").value;
    const player4 = document.getElementById("player4").value;

    const teamData = {
      teamName,
      players: [player1, player2, player3, player4],
      registeredSquad: [] // Initialize an empty array to store other users' registration information
    };

    saveTeam(teamData);
    displayTeams();
  });

  function saveTeam(team) {
    let teams = JSON.parse(localStorage.getItem('teams')) || [];
    teams.push(team);
    localStorage.setItem('teams', JSON.stringify(teams));
  }

  function displayTeams() {
    const teamsList = document.getElementById("teamsList");
    teamsList.innerHTML = ""; // Clear the previous list
    const teams = JSON.parse(localStorage.getItem('teams')) || [];
    teams.forEach((team, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${team.teamName} - Players: ${team.players.join(", ")} (${team.registeredSquad.length} squad registered)`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteTeam(index));
      listItem.appendChild(deleteButton);

      // Display registered squad information
      const registeredSquadList = document.createElement("ul");
      team.registeredSquad.forEach(user => {
        const userItem = document.createElement("li");
        userItem.textContent = user;
        registeredSquadList.appendChild(userItem);
      });
      listItem.appendChild(registeredSquadList);

      teamsList.appendChild(listItem);
    });
  }

  function deleteTeam(index) {
    const password = prompt("Enter admin password to delete this team:");
    if (password === adminPassword) {
      let teams = JSON.parse(localStorage.getItem('teams')) || [];
      teams.splice(index, 1);
      localStorage.setItem('teams', JSON.stringify(teams));
      displayTeams();
    } else {
      alert("Incorrect password. You are not authorized to delete this team.");
    }
  }

  // Display existing teams when the page loads
  displayTeams();
});

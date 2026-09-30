const CLAN_TAG = "%232908VU98U"; // Clan Tag: #2908VU98U
const API_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.clashofclans.com/v1/clans/${CLAN_TAG}`)}`;

async function fetchClanData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    // Fill Clan Details
    document.getElementById("clan-name").innerText = data.name;
    document.getElementById("clan-tag").innerText = data.tag;
    document.getElementById("clan-desc").innerText = data.description || "No description provided.";
    document.getElementById("total-members").innerText = `${data.members}/50`;
    document.getElementById("clan-points").innerText = data.clanPoints.toLocaleString();
    document.getElementById("war-wins").innerText = data.warWins;

    // Fill Table
    const tbody = document.getElementById("member-table-body");
    tbody.innerHTML = "";

    data.memberList.forEach(member => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${member.name}</strong></td>
        <td>${capitalize(member.role)}</td>
        <td><span class="th-badge">TH ${member.townHallLevel}</span></td>
        <td>🏆 ${member.trophies}</td>
      `;
      tr.onclick = () => openMemberDrawer(member);
      tbody.appendChild(tr);
    });

  } catch (error) {
    console.error("Error fetching clan data:", error);
    document.getElementById("clan-name").innerText = "Error Loading Data";
  }
}

function openMemberDrawer(member) {
  const drawer = document.getElementById("member-drawer");
  document.getElementById("drawer-name").innerText = `${member.name} (${member.tag})`;

  // Calculated mockup stats based on Town Hall Level
  const cwlScore = Math.min(100, Math.round((member.townHallLevel / 16) * 100));
  const eqScore = Math.min(100, Math.round((member.townHallLevel / 16) * 85));

  document.getElementById("cwl-score-text").innerText = `${cwlScore}%`;
  document.getElementById("cwl-bar").style.width = `${cwlScore}%`;

  document.getElementById("eq-score-text").innerText = `${eqScore}%`;
  document.getElementById("eq-bar").style.width = `${eqScore}%`;

  // Sample Hero Equipments
  const eqContainer = document.getElementById("equipment-chips");
  eqContainer.innerHTML = `
    <span class="eq-chip">Giant Gauntlet (Lvl 18)</span>
    <span class="eq-chip">Eternal Tome (Max)</span>
    <span class="eq-chip">Rage Gem (Lvl 15)</span>
    <span class="eq-chip">Frozen Arrow (Lvl 18)</span>
    <span class="eq-chip">Haste Vial (Lvl 15)</span>
  `;

  drawer.classList.add("active");
}

function closeDrawer() {
  document.getElementById("member-drawer").classList.remove("active");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace("member", "Member");
}

// Initial Load
fetchClanData();

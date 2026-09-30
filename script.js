const API_TOKEN = "EyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjE3MjAzMzUyLTEzMmYtNDY5Yi1iYjI4LWM1MWQzOTcxM2UyZCIsImlhdCI6MTc5MDc5NDU5Miwic3ViIjoiZGV2ZWxvcGVyLzM3NTcwNDdiLTFjYTQtNDQ0OC05MmE3LWY4NzYwNTgyZjVmZiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE1Mi41OS4xMjEuMjM3Il0sInR5cGUiOiJjbGllbnQifV19.nXrQoaufwOxjKoXfy8PXQbduQJ-x-gFU7S8zik1LilIwqRvGgC-u2CYa8L9PHUecLz72uGFAnyuMjRNHLdoadQ";
const CLAN_TAG = "%232908VU98U"; 

// Direct CORS Proxy with Auth Header support
const TARGET_URL = `https://api.clashofclans.com/v1/clans/${CLAN_TAG}`;
const API_URL = `https://corsproxy.io/?${encodeURIComponent(TARGET_URL)}`;

async function fetchClanData() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }

    const data = await response.json();

    // Fill Clan Details
    document.getElementById("clan-name").innerText = data.name || "Clan Name";
    document.getElementById("clan-tag").innerText = data.tag || "#2908VU98U";
    document.getElementById("clan-desc").innerText = data.description || "No description provided.";
    document.getElementById("total-members").innerText = `${data.members || 0}/50`;
    document.getElementById("clan-points").innerText = (data.clanPoints || 0).toLocaleString();
    document.getElementById("war-wins").innerText = data.warWins || 0;

    // Fill Table
    const tbody = document.getElementById("member-table-body");
    tbody.innerHTML = "";

    if (data.memberList && data.memberList.length > 0) {
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
    } else {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align: center;">No members found.</td></tr>`;
    }

  } catch (error) {
    console.error("Error fetching clan data:", error);
    document.getElementById("clan-name").innerText = "IP / API Token Error";
    document.getElementById("clan-desc").innerText = "Please update your IP on developer.clashofclans.com";
  }
}

function openMemberDrawer(member) {
  const drawer = document.getElementById("member-drawer");
  document.getElementById("drawer-name").innerText = `${member.name} (${member.tag})`;

  const cwlScore = Math.min(100, Math.round((member.townHallLevel / 16) * 100));
  const eqScore = Math.min(100, Math.round((member.townHallLevel / 16) * 85));

  document.getElementById("cwl-score-text").innerText = `${cwlScore}%`;
  document.getElementById("cwl-bar").style.width = `${cwlScore}%`;

  document.getElementById("eq-score-text").innerText = `${eqScore}%`;
  document.getElementById("eq-bar").style.width = `${eqScore}%`;

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
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).replace("member", "Member");
}

fetchClanData();
        

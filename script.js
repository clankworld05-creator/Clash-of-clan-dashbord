const API_TOKEN = "EyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjE3MjAzMzUyLTEzMmYtNDY5Yi1iYjI4LWM1MWQzOTcxM2UyZCIsImlhdCI6MTc5MDc5NDU5Miwic3ViIjoiZGV2ZWxvcGVyLzM3NTcwNDdiLTFjYTQtNDQ0OC05MmE3LWY4NzYwNTgyZjVmZiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE1Mi41OS4xMjEuMjM3Il0sInR5cGUiOiJjbGllbnQifV19.nXrQoaufwOxjKoXfy8PXQbduQJ-x-gFU7S8zik1LilIwqRvGgC-u2CYa8L9PHUecLz72uGFAnyuMjRNHLdoadQ";
const CLAN_TAG = "%232908VU98U"; // Clan tag #2908VU98U

const API_URL = `https://corsproxy.io/?${encodeURIComponent(`https://api.clashofclans.com/v1/clans/${CLAN_TAG}`)}`;

async function fetchClanData() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`
      }
    });

    if (!response.ok) throw new Error("API Network issue or Invalid Token/IP");

    const data = await response.json();
    
    // Clan Info Display
    document.getElementById('clan-info').innerHTML = `
      <h2>${data.name} (${data.tag})</h2>
      <p><strong>Clan Level:</strong> ${data.clanLevel} | <strong>Members:</strong> ${data.members}/50</p>
      <p><strong>Description:</strong> ${data.description}</p>
    `;

    // Members List Display
    const membersTable = document.getElementById('members-list');
    membersTable.innerHTML = '';

    data.memberList.forEach(member => {
      const row = `
        <tr>
          <td>${member.name}</td>
          <td>${member.tag}</td>
          <td>${member.role}</td>
          <td>TH ${member.townHallLevel}</td>
        </tr>
      `;
      membersTable.innerHTML += row;
    });

  } catch (error) {
    console.error(error);
    document.getElementById('clan-info').innerText = "Error loading data. Check console/IP restriction.";
  }
}

fetchClanData();
  

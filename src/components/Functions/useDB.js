import { gapi } from "gapi-script";

const SPREADSHEET_ID = "1yu8gkdOR1NFsr5XlYhez4BHeaaXgs31OOu3HaCX67hI";
const API_KEY = "AIzaSyBiU7-DQ4uxrsqrT7r6qAchfjRg_IZuQ6s";
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CLIENT_ID =
  "342906849110-iffb1qme7rrmuo74ogrk8egspi7d48js.apps.googleusercontent.com";

 let isInitialized = false; 

async function initGoogleSheets() {
    try {
  await gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    scope: SCOPES,
  });
  
  await gapi.auth2.init({
    client_id: CLIENT_ID,
    scope: SCOPES.join(" "),
  });
  
    const auth = gapi.auth2.getAuthInstance();
    await auth.signIn();

    isInitialized = true;
    console.log('Google Sheets API initialized successfully');
  } catch (err) {
    console.error('Error initializing Google Sheets API:', err);
  }

}
gapi.load("client", initGoogleSheets);

function saveVectorStorage(key, vector) {
  try {
    localStorage.setItem(key, JSON.stringify(vector));
    console.log(vector);
    console.log(`Saved vector to localStorage with key: ${key}`);
    console.log(`JSON.stringify(vector): ${JSON.stringify(vector)}`);
  } catch (err) {
    console.error("Error saving to localStorage:", err);
  }
}

function readVectorStorage(key) {
  try {
    const data = localStorage.getItem(key);
    if (!data) return [];
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading from localStorage:", err);
    return [];
  }
}

async function saveVectorGoogle(key, vector) {
  console.log(`Saving vector to Google Sheets with key: ${key}`);
  console.log("Data passed to saveVectorGoogle:", vector);
  console.log(`Vector data: ${JSON.stringify(vector)}`);
  try {
    if (key === "HallOfFame") {
      const values = vector.map((item) => [
        new Date(item.date).toISOString(),
        item.name,
        item.finalScore,
        item.questionDifficultyIndex,
        item.mapDifficultyIndex,
        item.timeDifficultyIndex,
      ]);
      console.log(`Saving to Google Sheets with key: ${key}`);
      console.log(`Values: ${JSON.stringify(values)}`);

      await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: "A2:F",
        valueInputOption: "RAW",
        resource: { values },
      });
    } else {
      // Use localStorage for other data
      localStorage.setItem(key, JSON.stringify(vector));
      console.log(`Saved vector to localStorage with key: ${key}`);
    }
  } catch (err) {
    console.error("Error saving data:", err);
  }
}

async function readVectorGoogle(key) {
  try {
    if (key === "HallOfFame") {
      console.log("Attempting to read from spreadsheet:", SPREADSHEET_ID);

      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "A2:F",
      });

      console.log("Raw response:", response);

      const rows = response.result.values || [];
      if (!rows.length) {
        console.log("No data found in spreadsheet");
        return [];
      }

      return rows.map((row) => ({
        date: new Date(row[0] || new Date()),
        name: row[1] || "",
        finalScore: Number(row[2]) || 0,
        questionDifficultyIndex: Number(row[3]) || 0,
        mapDifficultyIndex: Number(row[4]) || 0,
        timeDifficultyIndex: Number(row[5]) || 0,
      }));
    } else {
      // Use localStorage for other data
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    }
  } catch (err) {
    console.error("Error reading data:", err);
    return [];
  }
}

export {
  readVectorStorage,
  saveVectorStorage,
  readVectorGoogle,
  saveVectorGoogle,
};

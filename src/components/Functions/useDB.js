import { gapi } from 'gapi-script';

const SPREADSHEET_ID = "1yu8gkdOR1NFsr5XlYhez4BHeaaXgs31OOu3HaCX67hI";
const API_KEY = "AIzaSyBiU7-DQ4uxrsqrT7r6qAchfjRg_IZuQ6s";
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

async function initGoogleSheets() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    scope: SCOPES
  });
}

gapi.load('client', initGoogleSheets);

function saveVectorStorage(key, vector) {
  try {
    localStorage.setItem(key, JSON.stringify(vector));
    console.log(vector);
    console.log(`Saved vector to localStorage with key: ${key}`);
    console.log(`JSON.stringify(vector): ${JSON.stringify(vector)}`);
    
    
    
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
}

function readVectorStorage(key) {
  try {
    const data = localStorage.getItem(key);
    if (!data) return [];
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading from localStorage:', err);
    return [];
  }
}

async function saveVectorGoogle(key, vector) {
  try {
    if (key === 'HallOfFame') {
      // Format data for Google Sheets
      const values = vector.map(item => [
        new Date(item.date).toISOString(),
        item.name,
        item.finalScore,
        item.questionDifficultyIndex,
        item.mapDifficultyIndex,
        item.timeDifficultyIndex
      ]);

      await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A2:F',
        valueInputOption: 'RAW',
        resource: { values }
      });
    } else {
      // Use localStorage for other data
      localStorage.setItem(key, JSON.stringify(vector));
    }
  } catch (err) {
    console.error('Error saving data:', err);
  }
}

async function readVectorGoogle(key) {
  try {
    if (key === 'HallOfFame') {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A2:F'
      });

      const rows = response.result.values || [];
      return rows.map(row => ({
        date: new Date(row[0]),
        name: row[1],
        finalScore: Number(row[2]),
        questionDifficultyIndex: Number(row[3]),
        mapDifficultyIndex: Number(row[4]),
        timeDifficultyIndex: Number(row[5])
      }));
    } else {
      // Use localStorage for other data
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    }
  } catch (err) {
    console.error('Error reading data:', err);
    return [];
  }
}


export { readVectorStorage, saveVectorStorage, readVectorGoogle, saveVectorGoogle };

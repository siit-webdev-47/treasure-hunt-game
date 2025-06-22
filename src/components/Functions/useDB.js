
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




export { readVectorStorage, saveVectorStorage};

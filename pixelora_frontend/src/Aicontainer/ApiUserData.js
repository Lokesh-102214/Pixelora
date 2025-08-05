// Fetch StarryAI user data with a provided API token
export async function getStarryAiUserData(token) {
  const url = 'https://api.starryai.com/user/';
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'X-API-Key': token }
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error('Failed to fetch user data');
    const data = await res.json();
    // console.log(data); // Uncomment for debugging
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
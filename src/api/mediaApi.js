import axios from "axios";

/**
 * API KEYS:
 * We use environment variables (import.meta.env) to keep our API keys secret.
 */
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY;

/**
 * FETCHING PHOTOS (Unsplash API)
 * This function takes a 'query' (what to search) and returns a list of images.
 */
export async function fetchData(query, page = 1, per_page = 20) {
  try {
    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query, page, per_page },
      headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
    });
    // Return the list of photos (or an empty list if nothing found)
    return res.data.results || [];
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

/**
 * FETCHING VIDEOS (Pexels API)
 * Similar to photos, but fetches videos using the Pexels API.
 */
export async function fetchVideos(query, page = 1, per_page = 15) {
  try {
    const res = await axios.get("https://api.pexels.com/videos/search", {
      params: { query, page, per_page },
      headers: { Authorization: PEXELS_KEY },
    });
    return res.data.videos || [];
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

/**
 * FETCHING GIFs (GIPHY API)
 * Fetches GIFs. Note how we pass the api_key in 'params' instead of 'headers'.
 */
export async function fetchGifs(query, offset = 0, limit = 25) {
  try {
    const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: GIPHY_KEY,
        q: query,
        limit,
        offset,
        rating: "g",
        lang: "en",
      },
    });
    return res.data.data || [];
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    return [];
  }
}
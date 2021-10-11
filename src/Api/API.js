import axios from "axios";

const KEY = "23370146-76f1c4e47c9e63cf9b37b3a4d";
const URL = "https://pixabay.com/api/";

export const fetchImages = async (searchQuery, currentPage) => {
  try {
    const result = await axios.get(URL, {
      params: {
        key: KEY,
        q: searchQuery,
        page: currentPage,
        per_page: 12,
        image_type: "photo",
        orientation: "horizontal",
      },
    });
    return result.data.hits;
  } catch (error) {
    console.error(error);
  }
};

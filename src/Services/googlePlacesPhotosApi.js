import axios from "axios";

export default async function fetchCityImage(cityName) {
  try {
    const response = await axios.post("http://localhost:8080/api/google", {
      cityName,
    });

    if (response.data.imageUrl) {
      localStorage.setItem(`cityImage_${cityName}`, response.data.imageUrl);
      return response.data.imageUrl;
    } else {
      console.error("Image not found for this city.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching city image:", error);
    return null;
  }
}

export default async function fetchCityImage(cityName) {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${cityName}&key=${apiKey}`,
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    // need to request access to demo server https://cors-anywhere.herokuapp.com/corsdemo
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const place = data.results[0];
      const photoReference = place.photos
        ? place.photos[0].photo_reference
        : null;

      if (photoReference) {
        const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photo_reference=${photoReference}&key=${apiKey}`;

        return imageUrl;
      } else {
        console.log("No photos available for this place.");
      }
    } else {
      console.log("No results found for this city.");
    }
  } catch (error) {
    console.error("Error fetching city images:", error);
  }
}

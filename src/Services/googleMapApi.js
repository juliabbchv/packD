export const loadGoogleMapsAPI = (apiKey, callback) => {
  if (!document.querySelector(`script[src*="maps.googleapis.com"]`)) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;

    window.initGoogleMaps = () => {
      callback();
    };

    document.body.appendChild(script);
  } else if (window.google && window.google.maps) {
    callback();
  }
};

export const initializeAutocomplete = (inputRef, setAddress, setFormData) => {
  if (window.google && window.google.maps) {
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["(cities)"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setAddress(place.formatted_address);
        if (setFormData) {
          setFormData((prev) => ({
            ...prev,
            destination: place.formatted_address,
          }));
        }
      }
    });
  }
};

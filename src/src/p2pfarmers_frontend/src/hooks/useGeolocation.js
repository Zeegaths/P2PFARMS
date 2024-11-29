import { useState, useEffect } from "react";

/**
 * @typedef {Object} GeolocationData
 * @property {number} latitude - The latitude of the user's location.
 * @property {number} longitude - The longitude of the user's location.
 */

/**
 * @typedef {Object} UseGeolocationResult
 * @property {boolean} loading - Indicates if the geolocation data is still being loaded.
 * @property {Error|null} error - An error object if there was an error retrieving the geolocation.
 * @property {GeolocationData | null} data - The geolocation data containing latitude and longitude.
 * @property {Function} getLocation - A function to manually trigger the geolocation
 */

/**
 * Custom hook to get the user's geolocation.
 *
 * @returns {UseGeolocationResult} The geolocation state including loading, error, and data.
 */
export default function useGeolocation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const successHandler = (position) => {
    setLoading(false);
    setError(null);
    setData({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  const errorHandler = (error) => {
    setError(error);
    setLoading(false);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    } else {
      setError(new Error("Geolocation is not supported by this browser."));
      setLoading(false);
    }
  }, []);

  function getLocation() {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    } else {
      setError(new Error("Geolocation is not supported by this browser."));
      setLoading(false);
    }
  }

  return { loading, error, data, getLocation };
}

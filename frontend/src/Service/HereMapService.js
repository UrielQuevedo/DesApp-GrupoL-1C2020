import { useState } from "react";
import Axios from "axios";

export const useHereMapService = () => {
  const apiKey = process.env.REACT_APP_HEREMAP_TOKEN;
  const [ loading, setLoading ] = useState(false);

  const fetchPositionsByCoords = async ({ lat, lng }, next) => {
    setLoading(true);
    try {
      const locations = await Axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${lng}&apiKey=${apiKey}`);
      const newLocation = { address: locations.data.items[0].title, latitude: lat, longitude: lng };
      next(newLocation);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return { loading, fetchPositionsByCoords };

}
import { useState } from "react";
import Axios from "axios";

export const useHereMapService = () => {
  const apiKey = 'A5liKoRj88kze2rtyInYq-m6Eah7Hkg3Z2bd4kQoBH4';
  const [ loading, setLoading ] = useState(false);
  const [ location, setLocation ] = useState({});

  const fetchPositionsByCoords = async ({ lat, lng }, next) => {
    setLoading(true);
    try {
      const locations = await Axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${lng}&apiKey=${apiKey}`);
      setLocation({ address: locations.data.items[0].title, latitude: lat, longitude: lng });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    next();
  }

  return { loading, location, fetchPositionsByCoords };

}
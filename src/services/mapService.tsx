import axios from "axios";

export const reverseGeocode = async (latitude: number, longitude: number, setUser: any,user:any) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );

    if (response.data) {
      const address = response.data?.display_name;
      // updateUserLocation({ liveLocation: { latitude, longitude }, address }, setUser)
      setUser({
        ...user,
        userLocation:{ liveLocation: { latitude, longitude }, address }
      })
    } else {
      console.error("Geo code Failed", response.data);

    }

  } catch (error) {
    console.log("GEo code Failed Error", error);
  }

}
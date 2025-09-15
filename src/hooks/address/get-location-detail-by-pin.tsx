
import { useToast } from '@masumdev/rn-toast';
import { useState } from 'react'

export const useGetLocationDetailByPin = () => {

  // init
  const { showToast } = useToast();

  // state
  const [isLoading, setIsLOading] = useState(false)

  // api calls
  const handleSubmitGetLocationDetailByPin = async (pincode: number) => {
    setIsLOading(true)

    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
      method: 'GET',
      // body: formData,
      // headers: {
      //   'Authorization': `Bearer ${access_token}`,
      // }
    })

    const jsonResponse = await response.json();

    if (jsonResponse[0]?.Status === 'Success') {

      showToast('Get Details successfully', 'success');

      const city = jsonResponse[0].PostOffice[0].Division || jsonResponse[0].PostOffice[0].District;
      const country = jsonResponse[0].PostOffice[0].Country;
      const state = jsonResponse[0].PostOffice[0].State

      const data = {
        city: city,
        state: state,
        country: country
      }
      setIsLOading(false)
      return data
      // router.back()
    } else {
      showToast('Something went wrong. Please try again later.', 'error');
      setIsLOading(false)
    }

    // onClose()
    setIsLOading(false)
  }

  return { handleSubmitGetLocationDetailByPin, isLoading }
}
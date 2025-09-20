import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFormik } from 'formik';
import { useRoute } from '@react-navigation/native';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import { Container } from '@components/global/Container';
import { Colors, isModernAndroid, RoutesName } from '@utils/Constants';
import { AppBar } from '@components/global/AppBar';
import CustomText from '@components/global/CustomText';
import Body from '@components/global/Body';
import InputText from '@components/ui/InputText';
import useAddUserAddress from '@hooks/address/add-user-address';
import useUpdateUserAddress from '@hooks/address/update-user-address';
import { useGetLocationDetailByPin } from '@hooks/address/get-location-detail-by-pin';
import { addressAddSchema } from '@utils/validationSchema';
import addressService from '@services/address-service';
import { queryClient } from '@utils/react-query-config';
import { useAuthStore } from '@state/authStore';
import { navigate } from '@utils/NavigationUtils';
import PrimaryButton from '@components/ui/PrimaryButton';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';


const AddAddress = () => {

  // init
  const { user, setUser } = useAuthStore()
  const route = useRoute()
  const { editData }: any = route.params
  const fullName = editData.userName?.split(' ')
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  const useAddUserAddressMutation = useAddUserAddress()
  const useUpdateUserAddressMutation = useUpdateUserAddress()
  const { handleSubmitGetLocationDetailByPin, isLoading: locationDetailByPinIsLoading } = useGetLocationDetailByPin()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: !!editData ? {
      firstname: fullName[0],
      lastname: fullName[1],
      mobile: editData?.userMobile,
      address: editData?.Address,
      email: '',
      landmark: editData?.landmark,
      pincode: editData?.pincode,
      city: editData?.cityName,
      state: editData?.stateName,
      country: editData?.countryName
    } : {
      firstname: '',
      lastname: '',
      mobile: '',
      address: '',
      email: '',
      landmark: '',
      pincode: '',
      city: '',
      state: '',
      country: 'IN'
    },
    validationSchema: addressAddSchema,
    onSubmit: values => {
      const payload = {
        userName: `${values.firstname} ${values.lastname}`,
        userMobile: values.mobile,
        Address: values.address,
        landmark: values.landmark,
        pincode: Number(values.pincode),
        cityName: values.city,
        stateName: values.state,
        Country: values.country,
      }

      {
        !!editData ? useUpdateUserAddressMutation.mutate({ userId: user?.userUniqueId, addressId: editData?.id ?? '', payload: payload },
          {
            onSuccess: () => {

              queryClient.invalidateQueries({
                queryKey: [addressService.queryKeys.getUserAddresses + Number(user?.userUniqueId)]
              })
              navigate(RoutesName.Address)
              formik.resetForm()
            }
          }
        )
          : useAddUserAddressMutation.mutate({ userId: user?.userUniqueId, payload: payload },
            {
              onSuccess: () => {

                queryClient.invalidateQueries({
                  queryKey: [addressService.queryKeys.getUserAddresses + Number(user?.userUniqueId)]
                })
                navigate(RoutesName.Address)
                formik.resetForm()
              }
            }
          )

      }
    }
  });

  const handleGetLocationDetail = async () => {
    const res = await handleSubmitGetLocationDetailByPin(Number(formik.values.pincode))
    formik.setFieldValue('city', res?.city)
    formik.setFieldValue('state', res?.state)
    formik.setFieldValue('country', res?.country)
  }

  const RightNumberInput = () => (
    <View style={styles.rightInputBox}>
      <CustomText style={styles.countryCode}>+91</CustomText>
    </View>
  )

  return (
    <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle='dark-content'>
      <AppBar back title={!!editData ? 'Edit Address' : 'Add Address'} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : keyboardOffsetHeight > 0 ? 'height' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? moderateScaleVertical(10) : isModernAndroid ? moderateScaleVertical(50) : moderateScaleVertical(30)}
      >
        <Body style={{ marginHorizontal: moderateScale(10), gap: moderateScaleVertical(20) }}>
          <View style={styles.inputBlock}>
            <InputText
              label="First Name"
              textInputProps={{
                placeholder: 'Enter first name',
                value: formik.values.firstname,
                onChangeText: formik.handleChange('firstname'),
                onBlur: formik.handleBlur('firstname'),
              }}
            />
            {formik.errors.firstname && formik.touched.firstname && (
              <Text style={styles.errorText}>{formik.errors.firstname as string}</Text>
            )}
          </View>

          <View style={styles.inputBlock}>
            <InputText
              label="Last Name"
              textInputProps={{
                placeholder: 'Enter last name',
                value: formik.values.lastname,
                onChangeText: formik.handleChange('lastname'),
                onBlur: formik.handleBlur('lastname'),
              }}
            />
            {formik.errors.lastname && formik.touched.lastname && (
              <Text style={styles.errorText}>{formik.errors.lastname as string}</Text>
            )}
          </View>

          <View style={styles.inputBlock}>
            <InputText
              label="Phone Number"
              textInputProps={{
                placeholder: 'Enter phone number',
                keyboardType: 'number-pad',
                value: formik.values.mobile,
                onChangeText: formik.handleChange('mobile'),
                onBlur: formik.handleBlur('mobile'),
                style: { paddingLeft: 10, flex: 1 },
              }}
              left={<RightNumberInput />}
            />
            {formik.errors.mobile && formik.touched.mobile && (
              <Text style={styles.errorText}>{formik.errors.mobile as string}</Text>
            )}
          </View>

          <View style={styles.inputBlock}>
            <InputText
              label="Address"
              textInputProps={{
                placeholder: 'Enter address',
                value: formik.values.address,
                onChangeText: formik.handleChange('address'),
                onBlur: formik.handleBlur('address'),
              }}
            />
            {formik.errors.address && formik.touched.address && (
              <Text style={styles.errorText}>{formik.errors.address as string}</Text>
            )}
          </View>

          <View style={styles.inputBlock}>
            <InputText
              label="Landmark"
              textInputProps={{
                placeholder: 'Enter landmark',
                value: formik.values.landmark,
                onChangeText: formik.handleChange('landmark'),
                onBlur: formik.handleBlur('landmark'),
              }}
            />
            {formik.errors.landmark && formik.touched.landmark && (
              <Text style={styles.errorText}>{formik.errors.landmark as string}</Text>
            )}
          </View>

          <View style={styles.row}>
            <View style={styles.flex1}>
              <InputText
                label="Pin Code"
                textInputProps={{
                  placeholder: 'Enter pin code',
                  keyboardType: 'number-pad',
                  value: formik.values.pincode,
                  onChangeText: formik.handleChange('pincode'),
                  onBlur: formik.handleBlur('pincode'),
                }}
              />
              {formik.errors.pincode && formik.touched.pincode && (
                <Text style={styles.errorText}>{formik.errors.pincode as string}</Text>
              )}
            </View>
            <View style={styles.checkButton}>
              <PrimaryButton
                buttonText="Check"
                onPress={handleGetLocationDetail}
                disabled={locationDetailByPinIsLoading}
                loading={locationDetailByPinIsLoading}
                borderRadius={moderateScale(6)}

              />
            </View>
          </View>

          <View style={styles.inputBlock}>
            <InputText
              label="City"
              textInputProps={{
                placeholder: 'Enter city',
                value: formik.values.city,
                onChangeText: formik.handleChange('city'),
                onBlur: formik.handleBlur('city'),
              }}
            />
            {formik.errors.city && formik.touched.city && (
              <Text style={styles.errorText}>{formik.errors.city as string}</Text>
            )}
          </View>

          <View style={styles.inputBlock}>
            <InputText
              label="State"
              textInputProps={{
                placeholder: 'Enter state',
                value: formik.values.state,
                onChangeText: formik.handleChange('state'),
                onBlur: formik.handleBlur('state'),
              }}
            />
            {formik.errors.state && formik.touched.state && (
              <Text style={styles.errorText}>{formik.errors.state as string}</Text>
            )}
          </View>
        </Body>
        <PrimaryButton
          onPress={formik.handleSubmit}
          buttonText={!!editData ? 'Edit Address' : 'Save Address'}
          loading={useAddUserAddressMutation.isPending || useUpdateUserAddressMutation.isPending}
          disabled={useAddUserAddressMutation.isPending || useUpdateUserAddressMutation.isPending}
          borderRadius={moderateScale(10)}
          marginVertical={moderateScaleVertical(20)}

          marginHorizontal={moderateScale(20)}
        />
      </KeyboardAvoidingView>

    </Container>
  )
}

export default AddAddress

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: moderateScale(20),
    justifyContent: 'space-between',
    marginVertical: moderateScaleVertical(15)
  },
  headerText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    lineHeight: 20,
    color: Colors.black
  },
  inputBlock: {
    gap: moderateScale(5),
  },
  row: {
    flexDirection: 'row',
    gap: moderateScale(10),
  },
  flex1: {
    flex: 1,
    gap: moderateScale(5),
  },
  checkButton: {
    flex: 0.4,
    justifyContent: 'flex-end',
    paddingRight: moderateScale(0),
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 14,
    color: 'red'
  },
  rightInputBox: {
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(5),
    borderRightWidth: 1,
    borderRightColor: Colors.grayish,
    height: moderateScaleVertical(24),
    justifyContent: 'center'
  },
  countryCode: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 26,
    color: Colors.black
  }
});

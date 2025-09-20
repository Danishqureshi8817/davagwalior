import { useContext } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import { useFormik } from 'formik'
import { useAuthStore } from '@state/authStore'
import useGetUserProfile from '@hooks/profile/get-user-profile'
import useUpdateUserProfile from '@hooks/profile/update-user-profile'
import { editProfileSchema } from '@utils/validationSchema'
import { queryClient } from '@utils/react-query-config'
import profileService from '@services/profile-service'
import { Colors, Fonts, isModernAndroid, RoutesName } from '@utils/Constants'
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize'
import PrimaryButton from '@components/ui/PrimaryButton'
import { Container } from '@components/global/Container'
import { AppBar } from '@components/global/AppBar'
import Body from '@components/global/Body'
import InputText from '@components/ui/InputText'
import CustomText from '@components/global/CustomText'
import { goBack, navigate } from '@utils/NavigationUtils'
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight'


const EditProfile = () => {
  // init
  const { user } = useAuthStore()
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  // apis
  const { data, isLoading, refetch } = useGetUserProfile({ userId: user?.userUniqueId })
  const useUpdateUserProfileMutation = useUpdateUserProfile()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { name: data?.data?.result?.displayName ?? '', email: data?.data?.result?.email ?? '' },
    validationSchema: editProfileSchema,
    onSubmit: values => {
      const payload = {
        displayName: `${formik?.values?.name}`,
        country: "INDIA",
        email: formik?.values?.email
      }
      useUpdateUserProfileMutation.mutate({ payload, userid: user?.userUniqueId }, {
        onSuccess: () => {
         refetch()
          goBack()
        }
      })
    }
  })

  if (isLoading) {
    return (
      <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle='dark-content'>
        <AppBar back title='Edit Profile' />
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={'large'} color={Colors.Purple} />
        </View>
      </Container>
    )
  }

  return (
    <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle='dark-content'>
      <AppBar back title='Edit Profile' />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : keyboardOffsetHeight > 0 ? 'height' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? moderateScaleVertical(10) : isModernAndroid ? moderateScaleVertical(50) : moderateScaleVertical(30)}

      >


        <Body>
          <View style={styles.inputContainer}>
            <InputText
              label='First Name'
              textInputProps={{
                placeholder: "Enter first name",
                value: formik.values.name,
                onChangeText: formik.handleChange('name'),
                onBlur: formik.handleBlur('name')
              }}
            />
            {formik.errors.name && formik.touched.name && <CustomText variant='h8' fontFamily={Fonts.Medium} style={styles.errorText}>{formik.errors.name}</CustomText>}

            <InputText
              label='Email address'
              textInputProps={{
                placeholder: "Enter email",
                keyboardType: 'email-address',
                value: formik.values.email,
                onChangeText: formik.handleChange('email'),
                onBlur: formik.handleBlur('email')
              }}
            />
            {formik.errors.email && formik.touched.email && <CustomText variant='h8' fontFamily={Fonts.Medium} style={styles.errorText}>{formik.errors.email}</CustomText>}
          </View>

        </Body>

        <PrimaryButton
          onPress={formik.handleSubmit}
          buttonText='Save'
          loading={useUpdateUserProfileMutation.isPending}
          disabled={useUpdateUserProfileMutation.isPending}
          borderRadius={moderateScale(10)}
          marginVertical={moderateScaleVertical(30)}
          marginHorizontal={moderateScale(20)}
        />
      </KeyboardAvoidingView>
    </Container>
  )
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    paddingBottom: moderateScaleVertical(30),
  },
  inputContainer: {
    marginHorizontal: moderateScale(20),
    gap: moderateScaleVertical(25),
    marginTop: moderateScaleVertical(30),
  },
  errorText: {
    color: Colors.red,
  },
})

export default EditProfile

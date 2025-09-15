import { TextInput, TextInputProps, View } from 'react-native'
import { Colors, Fonts } from "@utils/Constants";
import CustomText from '@components/global/CustomText';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import { RFValue } from 'react-native-responsive-fontsize';

export interface InputTextProps {
  label?: string;
  // field: ControllerRenderProps<FieldValues, string>;
  textInputProps?: TextInputProps;
  left?: any;
  right?: any;
  handleKeyPress?: () => void;
}

function InputText(props: InputTextProps) {
  const { right, left, handleKeyPress, textInputProps, label } = props;
  // const { onChange, value, onBlur } = field;

  return (
    <View style={{gap:moderateScaleVertical(10)}}>
      <CustomText variant='h6' fontFamily={Fonts.Medium} >
        {label}
      </CustomText>
      <View style={{height: moderateScale(56),borderRadius: moderateScale(9),backgroundColor:Colors.paleGray,borderWidth:0,alignItems:'center',flexDirection:'row'}} >
        {left}
        <TextInput
          placeholder={textInputProps?.placeholder ?? ""}
          // value={value}
          // onChangeText={textInputProps?.keyboardType === "numeric" ? (val) => onChange(Number(val)) : onChange}
          // onBlur={onBlur}
          onSubmitEditing={handleKeyPress}
          returnKeyType="done"
          placeholderTextColor={Colors.grayish}
          style={[{ fontSize: RFValue(12), color: Colors.black, fontFamily: 'Poppins-Regular', paddingLeft: 20, flex: 1,}]}
          {...textInputProps}
        />
        {right}
      </View>
    </View>
  );
}

export default InputText;
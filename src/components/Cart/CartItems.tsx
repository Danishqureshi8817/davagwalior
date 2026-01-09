import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import { useCartStore } from "@state/cartStore";
import { Colors, Fonts } from "@utils/Constants";
import { moderateScale, moderateScaleVertical } from "@utils/responsiveSize";
import CustomText from "@components/global/CustomText";
import { DeleteCartItemIcon, MinusIcon, PlusIcon } from "@components/Icons";
import { useAuthStore } from "@state/authStore";

interface CartItemsProps {}

const CartItems: FC<CartItemsProps> = ({}) => {

  // init
  const { settingData } = useAuthStore()
  const cartItems = useCartStore((state) => state?.cart);
   const { addItem, removeItem, deleteItem } = useCartStore();

  return (
    <View style={styles.container}>
      {cartItems?.map((item: any) => {
        
        return (
          <View key={item?.id} style={styles.cartItem}>
            {/* Left section */}
            <View style={styles.leftRow}>
              <View style={styles.imageWrapper}>
                <Image
                  source={{uri: `${settingData?.s3Url}${item?.item?.thumbnail}`}}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.detailsColumn}>
                <CustomText fontFamily={Fonts.Medium} variant="h7" numberOfLine={1} style={styles.productName}>
                  {item?.item?.DisplayName}shfhfsgfshafjhgsdfjsgdjfgsjfgs
                </CustomText>
                <CustomText style={styles.brandName} fontFamily={Fonts.Medium} variant="h7" numberOfLine={1}>
                  {item?.item?.brand}fhjkashfkdshkhskhfkhskffhsjkh
                </CustomText>

                <View style={styles.priceRow}>
                  <CustomText
                    style={styles.sellPrice}
                    numberOfLine={1}
                  >
                    {"\u20B9"}
                    {item?.item?.sellPrice || "43"}
                  </CustomText>

                  <CustomText
                    style={styles.buyPrice}
                    numberOfLine={1}
                  >
                    MRP {"\u20B9"}
                    {item?.item?.BuyPrice || "43"}
                  </CustomText>
                </View>
              </View>
            </View>

            {/* Right section */}
            <View style={styles.rightColumn}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  deleteItem(item?.id);
                }}
                style={styles.trashIcon} 
              >
                <DeleteCartItemIcon />
              </TouchableOpacity>

              <View style={styles.quantityRow}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                   removeItem(item?.id);
                  }}
                >
                  <View style={styles.minusBtn}>
                    <MinusIcon />
                  </View>
                </TouchableOpacity>

                <CustomText style={styles.qty}>
                  {item?.count}
                </CustomText>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    addItem(item?.item);
                  }}
                >
                  <View style={styles.plusBtn}>
                    <PlusIcon />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.paleGray,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: moderateScale(20),
    height: moderateScale(125),
    borderBottomWidth: 1,
    borderBottomColor: Colors.brightGray,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(15),
    flex: 1,
    paddingRight: moderateScale(0),
  },
  imageWrapper: {
    backgroundColor: Colors.white,
    width: moderateScale(75),
    height: moderateScale(75),
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: moderateScale(64),
    height: moderateScale(64),
  },
  detailsColumn: {
    gap: moderateScaleVertical(5),
    flex: 1,
    marginRight: moderateScale(5),
  },
  productName: {
    color: Colors.black,
    flexShrink: 1,
  },
  brandName: {
    color: Colors.grayish,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(8),
  },
  sellPrice: {
    fontFamily: Fonts.SemiBold,
    fontSize: 14,
    color: Colors.deepPurple,
  },
  buyPrice: {
    fontFamily: Fonts.Medium,
    fontSize: 10,
    lineHeight: 12,
    color: Colors.mutedPurple,
    textDecorationLine: "line-through",
  },
  rightColumn: {
    flexDirection: "column",
    alignItems: "center",
    gap: moderateScaleVertical(25),
    minWidth: moderateScale(60),
  },
  trashIcon: {
    alignSelf: "flex-end",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: moderateScale(10),
  },
  minusBtn: {
    backgroundColor: Colors.lavenderBlush,
    height: moderateScale(25),
    width: moderateScale(25),
    borderRadius: moderateScale(15),
    alignItems: "center",
    justifyContent: "center",
  },
  qty: {
    fontFamily: Fonts.SemiBold,
    fontSize: 16,
    lineHeight: 18,
    color: Colors.black,
  },
  plusBtn: {
    backgroundColor: Colors.darkViolet,
    height: moderateScale(25),
    width: moderateScale(25),
    borderRadius: moderateScale(15),
    alignItems: "center",
    justifyContent: "center",
  },
});

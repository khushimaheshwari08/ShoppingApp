import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLOURS, Items} from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductInfo = ({route, navigation}) => {
  const {productID} = route.params;
  const [product, setProduct] = useState({});

  const width = Dimensions.get('window');

  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = async () => {
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].id == productID) {
        await setProduct(Items[index]);
        return;
      }
    }
  };
  console.log(product);

  // const renderProduct = ({item, index}) => {
  //   return (
  //     <View
  //       style={{
  //         width: width,
  //         height: 240,
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}>
  //       <Image
  //         source={item.productImage}
  //         style={{
  //           width: '100%',
  //           height: '100%',
  //           resizeMode: 'contain',
  //         }}
  //       />
  //     </View>
  //   );
  // };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
      }}>
      <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />
      <ScrollView>
        <View
          style={{
            width: '100%',
            backgroundColor: COLOURS.backgroundLight,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 4,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 16,
              paddingLeft: 16,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack('home')}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 18,
                  backgroundColor: COLOURS.white,
                  color: COLOURS.backgroundDark,
                  borderRadius: 10,
                  padding: 12,
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={product.productImageList ? product.productImageList : null}
            horizontal
            // renderItem={renderProduct}
          />
          
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductInfo;

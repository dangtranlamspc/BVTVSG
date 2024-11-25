import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProductModel } from '../../models/ProductModel';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment'
import { DateTime, globalStyles, Section } from '@bsdaoquang/rncomponent';
import LottieComponents from '../../components/LottieComponents';
import { Container, TextComponents } from '../../components';
import { colors } from '../../contants/colors';
import ProductItem from '../../components/ProductItem';

const date = new Date();
const ResultScreen = ({navigation, route} : any) => {
    const {
        filterValues,
      } : {
        filterValues : {
          categories : string[],
          price : {
            low: number,
            high : number,
          },
          sortby : string,
          rate: number,
        }
      } = route.params;
    
      const [isLoading, setIsLoading] = useState(false);
    
      const [products, setProduct] = useState<ProductModel[]>([]);
    
      useEffect (() => {
        getProduct();
      }, [filterValues])
    
      // console.log(filterValues)
      const getProduct = async () => {
        setIsLoading(true)
        try {
          const snap = await firestore()
          .collection('products')
          .where('categories', 'in', filterValues.categories)
          // .where('price','>=', filterValues.price.low)
          // .where('price','<',filterValues.price.high)
          .where('rate','==',filterValues.rate)
          .get()
          if ( !snap.empty) {
            const items : ProductModel[] = []
            snap.forEach((item : any) => {
              items.push({
                id: item.id,
                ...item.data(),
              })
            })
            const priceValues = items.filter(element =>
              element.price >= 
              (filterValues.price.low ? filterValues.price.low : 0) && 
              element.price < filterValues.price.high)
    
            let timeValues : ProductModel[] = []
    
            switch (filterValues.sortby) {
              case 'topseller' : 
                timeValues = priceValues.sort((a,b) => b.selled - a.selled)
              break;
    
              case 'thisweek' :
                timeValues = priceValues.filter (
                  element =>
                    element.createdAt > moment().weekday(0).toDate().getTime() && 
                    element.createdAt <=
                      new Date(`${DateTime.CalendarDate(date)} 23:59:59`).getTime()
                )
              break;
    
              default :
              timeValues = priceValues.filter(
                element => 
                  element.createdAt >
                    new Date(`${DateTime.CalendarDate(date)} 00:00:00`).getTime() && 
                  element.createdAt <= 
                    new Date(`${DateTime.CalendarDate(date)} 23:59:59`).getTime()
              )
              break
            }
    
            setProduct(timeValues)
          }
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
    
        }
      }
  return isLoading ?(
    <Section>
      <LottieComponents/>
    </Section> 
    ) : (
    <Container back isScroll={false}>
      {
        isLoading ? (
          <Section styles={[globalStyles.center, {flex : 1}] }>
            <ActivityIndicator size={24} color={colors.gray300}/>
          </Section>
        ) : (
            <Section>
              <FlatList
                numColumns={2}
                ListEmptyComponent={
                  <Section styles={[globalStyles.center,{flex : 1}]}>
                    <TextComponents text='Không tìm thấy dữ liệu' />
                  </Section>
                }
                data={products}
                columnWrapperStyle={{justifyContent:'space-between'}}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <ProductItem key={item.id} product={item}/>
                )} 
              />
            </Section>
          )}
    </Container>
  );
};

export default ResultScreen
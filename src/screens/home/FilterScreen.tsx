import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CategoryModel } from '../../models/CategoryModel';
import firestore from '@react-native-firebase/firestore'
import { ProductModel } from '../../models/ProductModel';
import { Container, TextComponents } from '../../components';
import { Button, Col, globalStyles, Row, Section, Space, Tabbar } from '@bsdaoquang/rncomponent';
import { colors } from '../../contants/colors';
import { SearchNormal, TickCircle } from 'iconsax-react-native';
import { fontFamilies } from '../../contants/fontFamilies';
import RNRangeSlider from 'rn-range-slider'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const FilterScreen = ({navigation} : any) => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);

    const [maxPrice, setMaxPrice] = useState(1000)

    const [isLoading, setIsLoading] = useState(false);

    const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);

    const [filterValues, setFilterValues] = useState<{
        categories : string[],
        price : {
            low: number,
            high : number,
        },
        sortby : string,
        rate: number,
    }>({
        categories : [],
        price : {
            low : 0,
            high : 1000,
        },
        sortby: 'today',
        rate : 5,

    });

    const sortByValues = [
        {        
            key : 'today',
            title : 'Mới hôm nay',
        },
        {        
            key : 'thisweek',
            title : 'Mới trong tuần này',
        },
        {        
            key : 'topseller',
            title : 'Bán chạy nhất',
        }
    ]

    useEffect(() => {
        getData();
    }, [])

    const getData = async() => {
        setIsLoading(true)

        try {
            await getCategories()
            await handleGetMaxPrice()
            setIsLoading(false)
            
        } catch (error) {
            setIsLoading(false)
        }
    }


    const getCategories = async() => {
        const snap = await firestore().collection('categories').orderBy('updatedAt','desc').get()
        if (!snap.empty) {
            const items : CategoryModel[] = [] ;
            snap.forEach((item : any) => items.push({id: item.id, ...item.data()}))
            handleSelectCategory(items[0].id)
            setCategories(items)
            setCategoriesSelected([items[0].id])
        }
    }

    const handleSelectCategory = (id : string) => {
        const items = [...categoriesSelected]
        const index = items.findIndex(element => element === id)

        if (index !== -1) {
            items.splice(index, 1)
        }else{
            items.push(id)
        }

        setCategoriesSelected(items)
    }

    const handleGetMaxPrice = async () => {
        const snap = await firestore().collection('products').orderBy('price').limitToLast(1).get()
        if (!snap.empty) {
            const items : ProductModel[] =[]
            snap.forEach((item : any) => {
                items.push({...item.data()})
            })
            items.length > 0 && setMaxPrice(items[2].price)
            setFilterValues({...filterValues, price: {low:0, high:items[2].price}})
        }
    }
  return (
    <Container
            bottomComponent={
                <Section>
                    <Button
                        inline
                        title="Tìm kiếm"
                        onPress={() => 
                            navigation.navigate('ResultScreen', {
                                filterValues : {
                                    ...filterValues,
                                    categories: categoriesSelected, 
                                }
                            })
                        }
                        color={colors.blue500}
                    />
                </Section>
            }
            back
            right={
                <TouchableOpacity>
                    <SearchNormal size={24} color={colors.blue400} />
                </TouchableOpacity>
            }>
            <Section>
                <Tabbar
                    showSeeMore={false}
                    titleStyleProps = {{fontFamily: fontFamilies.poppinsBold, fontSize: 18 , color: colors.blue600}}
                    title="Lọc theo danh mục"
                />
                <Row wrap='wrap' justifyContent='flex-start'>
                    {categories.map(item => (
                        <TouchableOpacity onPress={() => handleSelectCategory(item.id)}
                            style={[globalStyles.tag, 
                                {
                                borderWidth: 1,
                                borderRadius: 100,
                                paddingVertical: 8,
                                borderColor: colors.gray500,
                                paddingHorizontal : 20,
                                backgroundColor : categoriesSelected.includes(item.id) 
                                ? colors.blue500
                                : colors.white,
                                }]} 
                            key={item.id}>
                            <TextComponents
                                color={categoriesSelected.includes(item.id) ? colors.white : colors.blue400}
                                font={fontFamilies.poppinsBold} 
                                text={item.title} 
                            />
                        </TouchableOpacity>
                    ))}
                </Row>
            </Section>
            <Section>
                <Tabbar
                    showSeeMore={false}
                    titleStyleProps = {{fontFamily: fontFamilies.poppinsBold, fontSize: 18,color: colors.blue600}}
                    title="Lọc theo giá"
                />
                <Space height={16}/>
                <RNRangeSlider
                    
                    min={0} 
                    step={1} 
                    max={maxPrice} 
                    renderThumb={name => (
                        <View>
                            <View
                                style={{
                                    width:14,
                                    height:14,
                                    borderRadius:100,
                                    borderWidth: 2,
                                    borderColor: colors.blue500,
                                    backgroundColor : colors.white
                                }}
                            />
                            <View style={{
                                position: 'absolute',
                                right: 0,
                                left: -20,
                                bottom: 16,
                                width: 50,
                                alignItems: 'center'
                            }}>
                                <TextComponents
                                    size={18}
                                    color={colors.blue500}
                                    text={
                                        name === 'low'
                                        ? `${filterValues.price.low}`
                                        : `${filterValues.price.high.toLocaleString()}`
                                    }
                                />
                            </View>
                        </View>

                    )}
                    renderRail={() => (     
                            <View
                                style={{
                                    width:'100%',
                                    height:3,
                                    backgroundColor : colors.blue500,
                                }}
                            />        
                        
                    )}
                    renderRailSelected={() => (                    
                        <View
                            style={{
                                width:'100%',
                                height: 3,
                                backgroundColor : colors.blue500,
                            }}
                        />
                        
                    )}
                    onSliderTouchEnd={(low, high) => setFilterValues({...filterValues, price: {low, high}})}
                    onValueChanged={(low, high) => {}}
                />
            </Section>
            <Section>
                <Tabbar
                    showSeeMore={false}
                    titleStyleProps = {{fontFamily: fontFamilies.poppinsBold, fontSize: 24,color: colors.blue600}}
                    title="Lọc theo thời gian"
                />
                <Row wrap='wrap' justifyContent='flex-start'>
                    {sortByValues.map(item => (
                        <TouchableOpacity onPress={() => setFilterValues({...filterValues, sortby:item.key})}
                            style={[globalStyles.tag, 
                                {
                                borderWidth: 1,
                                borderRadius: 100,
                                paddingVertical: 8,
                                borderColor: colors.gray500,
                                paddingHorizontal : 12,
                                backgroundColor : filterValues.sortby === item.key
                                ? colors.blue500
                                : colors.white,
                                }]} 
                            key={item.key}>
                            <TextComponents
                                color={filterValues.sortby === item.key ? colors.white : colors.blue400}
                                font={fontFamilies.poppinsBold} 
                                text={item.title}
                            />
                        </TouchableOpacity>
                    ))}
                </Row>
            </Section>
            <Section>
                <Tabbar
                    showSeeMore={false}
                    titleStyleProps = {{fontFamily: fontFamilies.poppinsBold, fontSize: 24, color: colors.blue600}}
                    title="Lọc theo đánh giá"
                />
                {Array.from({length: 5}).map((item, index) => 5- index > 1 && (
                    <Row key={`rating${index}`} styles={{marginBottom:12}}>
                            <Col>
                                <Row 
                                    onPress={()=>setFilterValues({...filterValues, rate: 5 - index})}
                                    justifyContent="flex-start">
                                        {Array.from({length: 5 - index}).map((star, index)=> (
                                            <AntDesign style={{marginRight: 8}}
                                                name='star' 
                                                color={colors.warning}
                                                size={24}
                                                key={`star-${index}`}
                                            />
                                        ))}
                                </Row>
                            </Col>
                            {
                                5 - index === filterValues.rate 
                                ? <TickCircle size={24} color={colors.blue500} variant='Bold' /> 
                                : <FontAwesome name='circle' color={colors.gray300} size={24} />
                            }

                    </Row>
                ))}
            </Section>
            
    </Container>
  )
}

export default FilterScreen
import React, { useEffect, useRef } from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    addItemsFromStorage,
    changeCurrency,
    deleteProduct,
    fetchCurrency,
    fetchProducts
} from '../redux/productSlice';
import ProductItem from '../components/ProductItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProductListScreen = ({ navigation }) => {
    const refFlatList = useRef(null);
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state);

    useEffect(() => {
        (async () => {
            const response = await AsyncStorage.getItem('products');
            if(response !== null) {
                dispatch(addItemsFromStorage(JSON.parse(response)));
            }else {
                await dispatch(fetchProducts());
            }
            await dispatch(fetchCurrency());
        })();
    },[]);
    const generateKey = () => {
        return Math.random().toString(36).slice(2, 11);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Список товарів</Text>
                <TouchableOpacity onPress={() => dispatch(changeCurrency())} style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    backgroundColor: '#347CFF',
                    borderRadius: 20,
                }}>
                    <Text style={{
                        fontSize: 20,
                        color: 'white'
                    }}>{products.changeCurrency.toggle ? '$' : '₴'}</Text>
                </TouchableOpacity>
            </View>
            {products.status === 'loading' ? <ActivityIndicator size="large" color="#347CFF" /> :
                <FlatList
                    extraData={products?.items}
                    keyExtractor={()=>generateKey()}
                    ref={refFlatList}
                    data={products?.items}
                    renderItem={({ item }) => (
                        <ProductItem
                            product={item}
                            onPress={(product) => navigation.navigate('ProductDetails', { product })}

                        />
                    )}
                />
            }

            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddProduct')}
                >
                    <Text style={styles.addButtonText}>Додати товар</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={async () => {
                       await AsyncStorage.removeItem('products');
                        dispatch(deleteProduct());
                    }}
                >
                    <Text style={styles.deleteButtonText}>Видалити товар</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 20,
    },
    addButton: {
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundColor: '#39c027',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        gap: 10,
        marginHorizontal: 20,
    },
    deleteButton: {
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: '#d21440',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#347CFF',
    }
});

export default ProductListScreen;

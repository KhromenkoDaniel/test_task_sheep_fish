import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {useSelector} from "react-redux";

const ProductItem = React.memo(({ product, onPress }) => {
    const hasImage = product && product.image && product.image.length > 0;
    const {changeCurrency} = useSelector((state) => state.products);
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(product)}>
            <View style={styles.imageContainer}>
                {hasImage ? (
                    <Image source={{ uri: product.image }} style={styles.image} />
                ) : (
                    <View style={styles.noImageContainer}>
                        <Text style={styles.noImageText}>No photo</Text>
                    </View>
                )}
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{product && product.title}</Text>
                <Text style={styles.price}>{product && !changeCurrency.toggle ? (product?.price * changeCurrency.currency[0]?.buy).toFixed(2)+' ₴':product?.price + ' $'} </Text>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
    },
    imageContainer: {
        width: 100,
        height: 100,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    noImageContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noImageText: {
        color: '#fff',
        fontSize: 16,
    },
    detailsContainer: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: 'gray',
    },
});

export default ProductItem;

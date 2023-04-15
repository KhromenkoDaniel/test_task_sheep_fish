import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import IcArrowLeft from "../../assets/ic_arrow_left.svg";

const ProductDetailsScreen = ({ route , navigation }) => {
    const { product } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <IcArrowLeft />
                </TouchableOpacity>
                <Text style={styles.title}>Деталі товару </Text>
            </View>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.titleProduct}>{product?.title}</Text>
            <Text style={styles.price}>{product?.price} грн</Text>
            <Text style={styles.description}>{product.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    titleProduct: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        textAlign: 'justify',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#347CFF',
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
        gap: 10,
        paddingTop: 20,
    },
});

export default ProductDetailsScreen;

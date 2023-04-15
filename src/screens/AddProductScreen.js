import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productSlice';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

import Camera from '../../assets/ic_camera.svg';
import IcPlus from '../../assets/ic_plus.svg';
import IcArrowLeft from '../../assets/ic_arrow_left.svg';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Потрібно вказати назву товару'),
    price: Yup.number().required('Потрібно вказати ціну товару'),
    description: Yup.string().required('Потрібно вказати опис товару'),
});

const AddProductScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const addProductToStorage = async (values) => {
        try {
            const newProduct = { ...values, id: Date.now(), image: image };
            dispatch(addProduct(newProduct));

            const prevProducts = await AsyncStorage.getItem('products');
            const newProducts = prevProducts === null ? [newProduct] : [...JSON.parse(prevProducts), newProduct];
            await AsyncStorage.setItem('products', JSON.stringify(newProducts));
            navigation.navigate('ProductList');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <IcArrowLeft />
                </TouchableOpacity>
                <Text style={styles.title}>Додати товар</Text>
            </View>
            {image !== null && <Image source={{uri: image}} style={{ width: 200, height: 200, alignSelf: 'center', marginVertical: 24,}} />}
            <Formik
                initialValues={{ title: '', price: '', description: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => addProductToStorage(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        <Text style={styles.label}>Назва товару</Text>
                        <TextInput
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            value={values.title}
                            placeholder="Назва товару"
                            style={styles.input}
                        />
                        {errors.title && touched.title && <Text style={styles.error}>{errors.title}</Text>}
                        <Text style={styles.label}>Ціна товару</Text>
                        <TextInput
                            onChangeText={handleChange('price')}
                            onBlur={handleBlur('price')}
                            value={values.price}
                            keyboardType="numeric"
                            placeholder="Ціна товару в USD"
                            style={styles.input}
                        />
                        {errors.price && touched.price && <Text style={styles.error}>{errors.price}</Text>}
                        <Text style={styles.label}>Опис товару</Text>
                        <TextInput
                            onChangeText={
                            handleChange('description')}
                            onBlur={handleBlur('description')}
                            value={values.description}
                            placeholder="Опис товару"
                            style={styles.input}
                        />
                        {errors.description && touched.description && (
                            <Text style={styles.error}>{errors.description}</Text>
                        )}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <TouchableOpacity onPress={pickImage} style={styles.addButton}>
                                <Camera  fill={"#fff"}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
                                <IcPlus />
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#4c8bf5',
        borderRadius: 26,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignItems: 'center',
        alignSelf: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#347CFF',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#347CFF',
    }
});

export default AddProductScreen;

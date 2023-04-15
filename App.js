import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import AddProductScreen from './src/screens/AddProductScreen';
import store from './src/redux/store';

const Stack = createStackNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="ProductList">
                    <Stack.Screen
                        name="ProductList"
                        component={ProductListScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ProductDetails"
                        component={ProductDetailsScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="AddProduct"
                        component={AddProductScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;

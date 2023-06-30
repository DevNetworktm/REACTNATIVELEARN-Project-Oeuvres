import { StatusBar } from 'expo-status-bar';
import { StatusBar as S, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Screen
import Home from "./src/screen/Home";
import Account from "./src/screen/Account";
import { Provider } from "react-redux";
import Stores from "./src/stores";

export default function App(){
    const Tab = createBottomTabNavigator();
    const colors = {
        "true": "#F94854",
        "false": "#000"
    }

    return (
        <Provider store={ Stores }>
            <View style={ styles.container }>
                <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen name={ "Home" } component={ Home } options={ {
                            headerShown: false,
                            tabBarIcon: function({ size, focused }){
                                return <MaterialCommunityIcons name={ 'book-open' } size={ size }
                                                               color={ colors[ focused ] }/>
                            },
                            tabBarLabel: function({ focused }){
                                return <Text style={ { color: colors[ focused ] } }>Oeuvres</Text>
                            }
                        } }/>
                        <Tab.Screen name={ "Account" } component={ Account } options={ {
                            headerShown: false,
                            tabBarIcon: function({ size, focused }){
                                return <FontAwesome name={ 'user' } size={ size } color={ colors[ focused ] }/>
                            },
                            tabBarLabel: function({ focused }){
                                return <Text style={ { color: colors[ focused ] } }>Account</Text>
                            }
                        } }/>
                    </Tab.Navigator>

                </NavigationContainer>
                <StatusBar style="auto"/>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        marginTop: S.currentHeight,
    },
});

import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeAuth from "./auth/HomeAuth";

function Account(){
    const user = useSelector(state => state.user);

    const Stack = createNativeStackNavigator()

    const styles = StyleSheet.create({
        admin: {
            backgroundColor: "#F94854",
            maxWidth: 80,
            width: 80,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 25,
            borderRadius: 25,
            marginLeft: 10
        },
        redacteur: {
            backgroundColor: "#0240bd",
            maxWidth: 80,
            width: 80,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 25,
            borderRadius: 25,
            marginLeft: 10
        }
    })

    if ( user.logged ) {
        return (
            <View style={ { marginTop: Platform.OS === "ios" ? 100 : 10, flex: 1, alignItems: "center" } }>
                <Image style={ { width: "100%", height: 200 } } source={ require("../../assets/logo.png") }/>
                <View style={ { marginTop: 20, width: "100%", flex: 1, alignItems: "center" } }>
                    <View
                        style={ {
                            width: "60%",

                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row"
                        } }>
                        <Text style={ { fontSize: 20 } }>{ user.username }</Text>
                        <View style={ styles[ user.role ] }>
                            <Text style={ { color: "white" } }>{ user.role }</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    } else {
        return (
            <Stack.Navigator>
                <Stack.Screen name={ "home-auth" } component={ HomeAuth } options={ {
                    headerShown: false
                } }/>
            </Stack.Navigator>
        )
    }
}

export default Account;
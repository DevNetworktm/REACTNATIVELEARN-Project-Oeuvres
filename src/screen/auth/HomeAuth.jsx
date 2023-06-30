import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";

import { db } from "../../firebase/firabase";
import { collection, getDocs } from "firebase/firestore";
import Stores from "../../stores";
import { SignIn } from "../../actions/authActions";

function HomeAuth({ navigation }){
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("")

    async function handleClick(){
        const uSnap = await getDocs(collection(db, 'user'))
        const users = uSnap.docs.map((doc) => {
            return { _id: doc.ref.id, user: doc.data() }
        })

        const user = users.filter(el => el.user.email === email)[ 0 ];

        Object.assign(user, user.user);
        delete user.user;

        if ( user.password === password ) {
            Stores.dispatch(SignIn(user))
            
        } else {
            setPassword("")
            navigation.navigate('Home')
        }
    }

    return (
        <View style={ { marginTop: Platform.OS === "ios" ? 100 : 10, flex: 1, alignItems: "center" } }>
            <Image style={ { width: "100%", height: 200 } } source={ require("../../../assets/logo.png") }/>
            <Text style={ {
                textAlign: "center",
                marginTop: 25,
                fontSize: 25,
                textTransform: "uppercase",
                letterSpacing: 5
            } }>Authentication</Text>


            <View
                style={ { marginTop: Platform.OS === "ios" ? 100 : 70, width: "100%", flex: 1, alignItems: "center" } }>
                <View style={ styles.form_part }>
                    <TextInput onChangeText={ setEmail } inputMode={ "email" } style={ styles.form_part_input }
                               placeholder={ "exemple@gmail.com" }/>
                </View>
                <View style={ styles.form_part }>
                    <TextInput onChangeText={ setPassword } style={ styles.form_part_input } secureTextEntry={ true }
                               placeholder={ "Password123." }/>
                </View>
                <View style={ styles.form_part }>
                    <TouchableOpacity style={ styles.form_part_button } onPress={ handleClick }>
                        <Text style={ { color: "white", textTransform: "uppercase", letterSpacing: 3 } }> Sign
                            In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form_part: {
        width: "80%",
        marginTop: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    form_part_input: {
        width: "100%",
        borderWidth: 2,
        borderColor: "#F94854",
        height: 50,
        paddingLeft: 25,
        borderRadius: 25
    },
    form_part_button: {
        width: "80%",
        backgroundColor: "#F94854",
        textAlign: "center",
        height: 40,
        borderRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})
export default HomeAuth
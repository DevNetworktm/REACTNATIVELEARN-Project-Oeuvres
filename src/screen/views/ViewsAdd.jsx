import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firabase";
import { useState } from "react";

function ViewsAdd({ navigation }){
    const user = useSelector(state => state.user)
    const [ name, setName ] = useState("");
    const [ link, setLink ] = useState("");
    const [ description, setDescription ] = useState("");

    if ( !user.logged || user.role !== "admin" ) return navigation.navigate("viewsAll")

    async function handleClick(){
        await addDoc(collection(db, 'oeuvre'), {
            name,
            description,
            image: link,
            author: user._id,
            created_at: Date.now()
        })

        navigation.navigate("viewsAll", {
            refresh: true
        })
    }

    return (
        <View style={ { marginTop: Platform.OS === "ios" ? 100 : 10, flex: 1, alignItems: "center" } }>
            <Text style={ {
                textAlign: "center",
                marginTop: 25,
                fontSize: 25,
                textTransform: "uppercase",
                letterSpacing: 5
            } }>Add Oeuvre</Text>

            <View
                style={ { marginTop: Platform.OS === "ios" ? 30 : 20, width: "100%", flex: 1, alignItems: "center" } }>
                <View style={ styles.form_part }>
                    <TextInput onChangeText={ setLink } inputMode={ "url" } style={ styles.form_part_input }
                               placeholder={ "https://exemple.com/image.jpg" }/>
                </View>
                <View style={ styles.form_part }>
                    <TextInput onChangeText={ setName } style={ styles.form_part_input }
                               placeholder={ "name of oeuvre" }/>
                </View>
                <View style={ styles.form_part }>
                    <TextInput onChangeText={ setDescription } multiline={ true }
                               style={ [ styles.form_part_input, styles.form_part_texteara ] }
                               placeholder={ "description" }/>
                </View>
                <View style={ styles.form_part }>
                    <TouchableOpacity style={ styles.form_part_button } onPress={ handleClick }>
                        <Text style={ { color: "white", textTransform: "uppercase", letterSpacing: 3 } }> Save</Text>
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
    },
    form_part_texteara: {
        height: 150,
        borderRadius: 1,
        paddingTop: 10
    }
})

export default ViewsAdd
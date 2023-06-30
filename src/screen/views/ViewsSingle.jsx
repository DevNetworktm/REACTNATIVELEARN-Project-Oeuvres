import { ActivityIndicator, Dimensions, Image, View } from "react-native";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firabase";
import { doc, getDoc } from "firebase/firestore";

function ViewsSingle({ navigation, route }){
    const [ headerTitle, setHeaderTitle ] = useState('Oeuvres');
    const [ fetching, setFetching ] = useState({
        status: "LOADING",
        is: false,
        message: ""
    });
    const [ oeuvre, setOeuvre ] = useState({
        _id: "",
        name: "",
        description: "",
        image: "",
        author: {
            _id: "",
            email: "",
            role: "",
        },
        created_at: ""
    });
    const { id } = route.params;
    useEffect(() => {
        (async() => {
            const oSnap = await getDoc(doc(db, 'oeuvre', id));
            if ( oSnap.exists() ) {
                const result = {
                    _id: oSnap.ref.id,
                    ...oSnap.data()
                }

                const uSnap = await getDoc(doc(db, 'user', result.author))
                if ( uSnap.exists() ) {
                    result[ 'author' ] = {
                        _id: uSnap.ref.id,
                        email: uSnap.data().email,
                        role: uSnap.data().role
                    }
                } else {
                    setFetching({ is: false, status: "ERROR", message: "An error has occurred !" })
                }

                setHeaderTitle(`${ result.name } | Oeuvre`)
                setOeuvre(result)
                setFetching({ is: true, status: "END" })
            } else {
                setFetching({ is: false, status: "ERROR", message: "Oeuvre is not found !" })
            }
        })()
    }, [])

    useEffect(() => {
        navigation.setOptions({
            title: headerTitle,
            showTitle: true
        });
    }, [ headerTitle, navigation ]);

    if ( fetching.is && fetching.status === "END" ) {
        return (
            <View>
                <Image source={ { uri: oeuvre.image } }
                       style={ { width: "100%", height: Dimensions.get("screen").height } }/>
            </View>
        )
    } else if ( !fetching.is && fetching.status === "LOADING" ) {
        return (
            <View style={ { flex: 1, justifyContent: "center" } }>
                <ActivityIndicator size={ "large" }/>
            </View>
        )
    } else {

    }
}

export default ViewsSingle
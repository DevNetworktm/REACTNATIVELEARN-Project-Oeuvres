import {
    ActivityIndicator,
    Dimensions,
    Image,
    RefreshControl,
    ScrollView,
    StatusBar as S,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { db } from "../../firebase/firabase";
import { collection, getDocs } from "firebase/firestore"
import { useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";

function ViewsAll({ navigation, route }){
    const [ fetching, setFetching ] = useState(false);
    const [ refreshing, setRefreshing ] = useState(false)
    const [ oeuvres, setOeuvres ] = useState([]);

    const onRefresh = useCallback(() => {
        (async() => {
            setRefreshing(true)
            const oSnap = await getDocs(collection(db, "oeuvre"))
            const oList = oSnap.docs.map((o) => {
                setFetching(true)
                return {
                    _id: o.ref.id,
                    loaded: false,
                    ...o.data()
                }
            })
            setOeuvres(prev => prev = [ ...oList ])
            setTimeout(() => {
                setRefreshing(false);
            }, 2000);
        })()
    }, [])

    const user = useSelector(state => state.user)

    const screenHeight = Dimensions.get('window').height;

    useEffect(() => {
        (async() => {
            const oSnap = await getDocs(collection(db, "oeuvre"))
            const oList = oSnap.docs.map((o) => {
                setFetching(true)
                return {
                    _id: o.ref.id,
                    loaded: false,
                    ...o.data()
                }
            })
            setOeuvres(prev => prev = [ ...oList ])
        })()
    }, [])

    function handleClick(id){
        return (e) => {
            navigation.navigate('views', {
                id
            })
        }
    }

    if ( fetching )
        return (
            <View style={ { paddingTop: S.currentHeight } }>
                {
                    user.logged && user.role === "admin" ?
                        <View
                            style={ {
                                marginTop: 50,
                                height: 50,
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            } }>
                            <View style={ { marginLeft: 25 } }>
                                <Image style={ { width: 50, height: 50 } }
                                       source={ require('../../../assets/logo.png') }/>
                            </View>
                            <TouchableOpacity
                                onPress={ () => navigation.navigate('viewsAdd') }
                                style={ {
                                    marginRight: 25,
                                    backgroundColor: "#F94854",
                                    width: 30,
                                    height: 30,
                                    borderRadius: 100,

                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                } }>
                                <Text>
                                    <AntDesign name={ "plus" } size={ 20 } color={ "white" }/>
                                </Text>
                            </TouchableOpacity>
                        </View>
                        : null
                }
                <ScrollView
                    refreshControl={
                        <RefreshControl tintColor="#000" refreshing={ refreshing } onRefresh={ onRefresh }/>
                    }>
                    {
                        oeuvres.map(o => {
                            return (
                                <View key={ o._id } style={ { marginBottom: 25 } }>
                                    <TouchableWithoutFeedback onPress={ handleClick(o._id) }>
                                        <Image
                                            style={ { width: "100%", height: screenHeight - S.currentHeight - 150 } }
                                            source={ { uri: o.image } }/>
                                    </TouchableWithoutFeedback>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    else
        return (
            <View style={ { flex: 1, justifyContent: "center" } }>
                <ActivityIndicator size={ "large" }/>
            </View>
        )
}

export default ViewsAll
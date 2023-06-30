import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screen
import ViewsAll from "./views/ViewsAll";
import ViewsSingle from "./views/ViewsSingle";
import ViewsAdd from "./views/ViewsAdd";

function Home({ navigation }){
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name={ 'viewsAll' } component={ ViewsAll } options={ {
                headerShown: false
            } }/>
            <Stack.Screen name={ 'views' } component={ ViewsSingle } options={ {
                headerShown: true
            } }/>
            <Stack.Screen name={ 'viewsAdd' } component={ ViewsAdd } options={ {
                headerShown: false
            } }/>
        </Stack.Navigator>
    )
}

export default Home
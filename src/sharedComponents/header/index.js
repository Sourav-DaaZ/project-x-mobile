import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native-paper';
const { height, width } = Dimensions.get('screen');

const Header = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.subContainer}>
                    <View style={styles.flex}>
                        <TouchableOpacity onPress={() => navigation.goBack(null)}>
                            <Ionic
                                name="ios-arrow-back"
                                size={25}
                                onPress={() => navigation.goBack(null)}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>
               

                <Text style={styles.title}>{'hiii'}</Text>


                <View style={styles.flex} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f45b55',
        height: 700,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    backContainer: {
        position: 'absolute',
        left: 20,
        bottom: 0,
        color: '#fff',
    },
    title: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    flex: {
        flex: 1,
    },
    profileImage: {
        height: 25,
        width: 25,
        borderRadius: 12.5,
        alignSelf: 'flex-end',
        marginBottom: 2,
    },
});

export default Header;
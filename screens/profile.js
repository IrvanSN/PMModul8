import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    // Button,
    Linking,
    TextInput
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    useToast,
    Toast,
    ToastTitle,
    ToastDescription,
    VStack,
    Button,
    ButtonText,
    Input,
    InputField,
    InputSlot,
    FormControl,
    Heading
} from '@gluestack-ui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { setNama, setNim } from "../redux/profileSlice";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
    const toast = useToast();
    const navigation = useNavigation();
    // We use the useDispatch hook to dispatch actions to the store
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const [tempNama, setTempNama] = useState('')
    const [tempNim, setTempNim] = useState('')

    const showToast = () => {
        toast.show({
            placement: "bottom left",
            render: ({ id }) => {
                return (
                    <Toast
                        nativeID={"toast-" + id}
                        action="error"
                        variant="accent"
                    >
                        <VStack space="xs">
                            <ToastTitle>Error</ToastTitle>
                            <ToastDescription>
                                Anda belum mengisi Nama atau NIM!
                            </ToastDescription>
                        </VStack>
                    </Toast>
                )
            },
        })
    }

    return (
        <View style={styles.container}>
            <FormControl
                p="$4"
                borderWidth="$1"
                borderRadius="$lg"
                borderColor="$borderLight300"
                sx={{
                    _dark: {
                        borderWidth: "$1",
                        borderRadius: "$lg",
                        borderColor: "$borderDark800",
                    },
                }}
            >
                <VStack space="4xl">
                    <Heading color="black" lineHeight="$md">
                        Profile {profile.nama} ({profile.nim})
                    </Heading>
                    <VStack space="sm">
                        <Text color="black" lineHeight="sm" sx={{ width: '100%' }}>
                            Nama
                        </Text>
                        <Input>
                            <InputField type="text" value={tempNama}
                                onChangeText={(text) => setTempNama(text)} />
                        </Input>
                    </VStack>
                    <VStack space="xs">
                        <Text color="black" lineHeight="$xs">
                            NIM
                        </Text>
                        <Input>
                            <InputField type="text" value={tempNim}
                                onChangeText={(text) => setTempNim(text)} />
                        </Input>
                    </VStack>

                    <Button
                        ml="auto"
                        onPress={() => {
                            if (tempNama === '' || tempNim === '') {
                                showToast();
                                return;
                            }
                            dispatch(setNama(tempNama));
                            dispatch(setNim(tempNim));
                            navigation.navigate("BottomNavigator");
                        }}
                    >
                        <ButtonText color="$white">Save</ButtonText>
                    </Button>
                </VStack>
            </FormControl>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    input: {
        borderWidth: 3,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 18,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 7,
        color: "blue",
    },
    content: {
        fontSize: 18,
        marginBottom: 20,
        padding: 20
    }
});

export default ProfileScreen;
import { View, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router, usePathname } from 'expo-router';
import { INDIGO, ROSE } from '@/constants/Colors';
import { CustomText } from '@/components/CustomText';
import Constants from 'expo-constants';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableHighlight } from 'react-native-gesture-handler';

const CustomDrawerContent = (props) => {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <DrawerContentScrollView {...props} style={styles.drawer}>
      <View style={styles.userInfoWrapper}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/26.jpg' }}
          width={80}
          height={80}
          style={styles.userImg}
        />
        <View style={styles.userDetailsWrapper}>
          <CustomText style={styles.userName}>John Doe</CustomText>
          <CustomText style={styles.userEmail}>john@email.com</CustomText>
        </View>
      </View>

      <DrawerItem
        icon={({ color, size }) => (
          <MaterialIcons name="home" size={size} color={'white'} />
        )}
        label={'Home'}
        labelStyle={[styles.navItemLabel]}
        style={{ backgroundColor: pathname == '/' ? ROSE : INDIGO }}
        onPress={() => {
          router.push('/(tabs)');
        }}
      />

      <DrawerItem
        icon={({ color, size }) => (
          <MaterialIcons name="account-circle" size={size} color={'white'} />
        )}
        label={'User info'}
        labelStyle={[styles.navItemLabel]}
        style={{
          backgroundColor: pathname == '/user' ? ROSE : INDIGO,
        }}
        onPress={() => {
          router.push('/user');
        }}
      />
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false, drawerPosition: 'right' }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="user"
        options={{
          headerShown: true,
          header: () => (
            <TouchableHighlight
              onPress={() => router.back()}
              underlayColor={ROSE}
              style={{
                marginTop: Constants.statusBarHeight + 8,
                backgroundColor: INDIGO,
                borderRadius: 8,
                height: 64,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                marginHorizontal: 8,
                width: 64,
              }}
            >
              <View>
                <MaterialIcons name="arrow-back" color="white" size={32} />
              </View>
            </TouchableHighlight>
          ),
        }}
      />
    </Drawer>
  );
}

// <DrawerToggleButton tintColor="white"></DrawerToggleButton>

const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft: -20,
    color: 'white',
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    marginHorizontal: 8,
    gap: 8,
    backgroundColor: INDIGO,
    padding: 8,
    borderRadius: 8,
  },
  userImg: {
    borderRadius: 999,
  },
  userDetailsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userName: {
    color: 'white',
    fontFamily: 'Outfit_500Medium',
  },
  userEmail: {
    color: 'white',
  },
  drawer: {
    paddingHorizontal: 8,
  },
});

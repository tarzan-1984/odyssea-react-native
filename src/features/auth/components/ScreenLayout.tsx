import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { colors } from "@/lib";

interface ScreenLayoutProps {
	children: React.ReactNode;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children }) => {
	return (
		<View style={styles.container}>
			<Image
				source={require('../../../../assets/bgBlue.png')}
				style={styles.bgImage}
				resizeMode="cover"
			/>
			
			<View style={styles.content}>
				{children}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary.blue,
		position: "relative",
	},
	bgImage: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: "100%",
		height: "100%",
	},
	content: {
		flex: 1,
		position: "relative",
		zIndex: 3,
		paddingHorizontal: 20,
		paddingTop: 20,
	}
});

export default ScreenLayout;
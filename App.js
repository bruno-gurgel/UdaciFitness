import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import AddEntry from "./components/AddEntry";
import store from "./redux/store";

export default function App() {
	return (
		<Provider store={store}>
			<View>
				<AddEntry />
			</View>
		</Provider>
	);
}

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

const IconList = ({ icons, onSelect }) => {
  const renderRow = (rowIcons) => (
    <View style={styles.row}>
      {rowIcons.map((icon, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSelect(icon)}
          style={styles.iconContainer}>
          <IconButton
            icon={icon}
            color='#fff'
            size={30}
            style={styles.iconButton}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  // Split icons array into rows of 5 icons
  const rows = [];
  for (let i = 0; i < icons.length; i += 5) {
    rows.push(icons.slice(i, i + 5));
  }

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex}>{renderRow(row)}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  iconContainer: {
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "#4caf50",
    borderRadius: 25,
    padding: 10,
  },
});

export default IconList;

import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useTheme } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

const DateInput = ({ label, date, setDate }) => {
  const [dataMenuVisible, setDataMenuVisible] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();
  const dateTheme = theme.components.DateInput.styleOverrides;

  const openDataMenu = () => setDataMenuVisible(true);

  const handleDateChange = (event, selectedDate) => {
    setDataMenuVisible(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={dateTheme.container}>
      <TouchableOpacity onPress={openDataMenu}>
        <View style={dateTheme.dropdown}>
          <View style={dateTheme.leftSection}>
            <View style={dateTheme.labelContainer}>
              <Icon
                name="calendar"
                size={24}
                color={theme.colors.primary}
                style={dateTheme.icon}
              />
              <Text style={dateTheme.dropdownText}>{t(label)}</Text>
            </View>
            <Text style={dateTheme.dropdownValue}>
              {date.toLocaleDateString()}
            </Text>
          </View>
          <View style={dateTheme.arrowIconContainer}>
            <Icon name="chevron-down" size={24} color="gray" />
          </View>
        </View>
      </TouchableOpacity>
      {dataMenuVisible && (
        <View style={dateTheme.dateTimePickerContainer}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        </View>
      )}
    </View>
  );
};

export default DateInput;

import React from "react";
import { View, Text } from "react-native";
import PieChart from "react-native-pie-chart";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

// Import the useCurrency hook
import { useCurrencyContext } from "../context/CurrencyContext";

// PieChartComponent component definition
const PieChartComponent = ({ title, data }) => {
  // Get theme, style overrides and the currency
  const { t } = useTranslation();
  const theme = useTheme();
  const pieChartTheme = theme.components.PieChartComponent.styleOverrides;
  const { currency, setCurrency } = useCurrencyContext();

  // Directly use the data structure the library requires
  const series = data.map((item) => ({
    value: item.percent,
    color: item.color,
  }));

  // Check if we have valid data to display
  const hasData = series.length > 0 && series.some((item) => item.value > 0);

  return (
    // Container for the pie chart and legend
    <View style={pieChartTheme.container}>
      {/* Title of the pie chart title*/}
      <Text style={pieChartTheme.title}>{title}</Text>
      {/* Check if we have data to display */}
      {hasData ? (
        <View style={{ flexDirection: "row" }}>
          {/* Pie chart component */}
          <PieChart
            widthAndHeight={200}
            series={series}
            chartProps={{ style: { marginRight: 16 } }}
            coverRadius={0.75}
          />
          {/* Legend for the pie chart */}
          <View style={pieChartTheme.legendContainer}>
            {data.map((item, index) => (
              <View key={index} style={pieChartTheme.legendItem}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={[
                      pieChartTheme.legendColor,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <Text style={pieChartTheme.legendText}>{item.name}</Text>
                </View>
                <Text style={pieChartTheme.legendValues}>
                  {item.percent.toFixed(1)}%{" "}
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: item.balance < 0 ? "red" : "green",
                    }}
                  >
                    {item.balance < 0 ? "- " : "+ "} {currency}{" "}
                    {Math.abs(item.balance).toFixed(0)}
                  </Text>
                </Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <Text style={pieChartTheme.noDataText}>
          {t("pieChartComponent.noDataText")}
        </Text>
      )}
    </View>
  );
};

export default PieChartComponent;

import React from "react";
import { View, Text } from "react-native";
import PieChart from "react-native-pie-chart";
import { useTheme } from "react-native-paper";
import useCurrency from "../hooks/useCurrency";

// PieChartComponent component definition
const PieChartComponent = ({ title, data }) => {
  // Get theme, style overrides and the currency
  const theme = useTheme();
  const pieChartTheme = theme.components.PieChart.styleOverrides;
  const currency = useCurrency();

  // Directly use the data structure the library requires
  const series = data.map((item) => ({
    value: item.percent,
    color: item.color,
  }));

  return (
    // Container for the pie chart and legend
    <View style={pieChartTheme.container}>
      {/* Title of the pie chart title*/}
      <Text style={pieChartTheme.title}>{title}</Text>
      <View style={{ flexDirection: "row" }}>
        {/* Pie chart component */}
        <PieChart
          widthAndHeight={200}
          series={series}
          chartProps={{ style: { marginRight: 16 } }}
          cover={0.75}
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
    </View>
  );
};

export default PieChartComponent;

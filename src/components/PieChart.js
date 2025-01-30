import React from "react";
import { View, Text } from "react-native";
import { PieChart as SvgPieChart } from "react-native-svg-charts";
import { useTheme } from "react-native-paper";
import useCurrency from "../hooks/useCurrency";

// PieChart component definition
const PieChart = ({ title, data }) => {
  // Get theme, style overrides and the currency
  const theme = useTheme();
  const pieChartTheme = theme.components.PieChart.styleOverrides;
  const currency = useCurrency();

  // Convert input data to correct format
  const pieData = data.map((item, index) => ({
    key: `slice-${index}`,
    value: item.percent,
    svg: { fill: item.color },
  }));

  return (
    // Container for PieChart component including chart and legend
    <View style={pieChartTheme.container}>
      {/* Render the pie chart title */}
      <Text style={pieChartTheme.title}>{title}</Text>
      <View style={{ flexDirection: "row" }}>
        {/* Svg Pie chart component */}
        <SvgPieChart
          style={{ flex: 1, height: 200, width: 200 }}
          data={pieData}
        />
        {/* Legend of the PieChart */}
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

export default PieChart;

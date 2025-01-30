// src/components/PieChart.js
import React from "react";
import { View, Text } from "react-native";
import { PieChart as SvgPieChart } from "react-native-svg-charts";
import { useTheme } from "react-native-paper";
import useCurrency from "../hooks/useCurrency";

const PieChart = ({ title, data }) => {
  const theme = useTheme();
  const pieChartTheme = theme.components.PieChart.styleOverrides;
  const currency = useCurrency();

  const pieData = data.map((item, index) => ({
    key: `slice-${index}`,
    value: item.percent,
    svg: { fill: item.color },
  }));

  return (
    <View style={pieChartTheme.container}>
      <Text style={pieChartTheme.title}>{title}</Text>
      <View style={{ flexDirection: "row" }}>
        <SvgPieChart
          style={{ flex: 1, height: 200, width: 200 }}
          data={pieData}
        />
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

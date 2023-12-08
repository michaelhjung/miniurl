import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const AnalyticsChartD3 = ({ analyticsData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!analyticsData || analyticsData.length === 0) return;

    // Visualization: Hits by Time of Day (Line Chart)
    const timeOfDayChart = createTimeOfDayChart(analyticsData);

    return () => {
      timeOfDayChart.destroy();
      // Destroy or cleanup any other charts as needed
    };
  }, [analyticsData]);

  const createTimeOfDayChart = (data) => {
    const svg = d3.select(chartRef.current);

    // Extract the day of the week and hour from the createdAt timestamp
    const times = data.map((d) => {
      const date = new Date(d.createdAt);
      return {
        dayOfWeek: date.getDay(),
        hour: date.getHours() + date.getMinutes() / 60,
      };
    });

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 700 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3
      .scaleLinear()
      .domain([0, 24]) // Assuming data spans 24 hours
      .range([margin.left, width + margin.left]);

    const y = d3
      .scaleBand()
      .domain(d3.range(7)) // 0 to 6 representing days of the week (Sunday to Saturday)
      .range([height, 0])
      .padding(0.1);

    svg.selectAll("*").remove();

    // Create circles for each hour
    svg
      .selectAll("circle")
      .data(times)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.hour))
      .attr("cy", (d) => y(d.dayOfWeek))
      .attr("r", 5) // Adjust the radius as needed
      .attr("fill", "steelblue");

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3.axisBottom(x).tickFormat((d) => {
          // Format the ticks as time labels (e.g., 1:00 PM)
          const hours = Math.floor(d);
          const minutes = Math.round((d % 1) * 60);
          const period = hours < 12 ? "AM" : "PM";
          const formattedHours = hours % 12 || 12;
          return `${formattedHours}:${
            minutes < 10 ? "0" : ""
          }${minutes} ${period}`;
        })
      )
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)") // Rotate x-axis labels for better visibility
      .style("text-anchor", "end");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(
        d3.axisLeft(y).tickFormat((d) => {
          // Format the ticks as day labels
          const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          return daysOfWeek[d];
        })
      );

    return {
      destroy: () => svg.selectAll("*").remove(),
    };
  };

  return (
    <div>
      <svg ref={chartRef} width={700} height={500} />
    </div>
  );
};

export default AnalyticsChartD3;

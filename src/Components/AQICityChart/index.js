import { ResponsiveLine } from "@nivo/line";
import moment from "moment";
import { useContext, useEffect, useState, useRef } from "react";
import { AQIContext } from "../../App";
import { randomColor, RequestStatus } from "../../Utils/utils";
import style from "./line.module.css";

const Tooltip = ({ point }) => {
  return <p>AQI: {parseFloat(point.data.y.toString()).toFixed(2)}</p>;
};

const AQICityChart = ({ cities }) => {
  const { status, data } = useContext(AQIContext);

  const [citiesLineData, setCitiesLineData] = useState({});

  const color = useRef(cities.map(() => randomColor()));

  useEffect(() => {
    const citiesAvailable = Object.keys(data).filter((city) =>
      cities.includes(city)
    );

    const citiesLineDataObj = { ...citiesLineData };

    if (citiesAvailable) {
      cities.forEach((currentCity) => {
        if (!data[currentCity]) {
          return;
        }

        if (!citiesLineDataObj[currentCity]) {
          citiesLineDataObj[currentCity] = [];
        }

        const newAQITime = moment(data[currentCity].time).format("h:mm:ss A");

        const isDuplicateTime = citiesLineDataObj[currentCity].find(
          (point) => point.x === newAQITime
        );

        if (!isDuplicateTime) {
          const newCityData = {};
          for (const city in citiesLineDataObj) {
            const cityLength = citiesLineDataObj[city].length;
            const previousAQIValue =
              cityLength > 0
                ? citiesLineDataObj[city][cityLength - 1].y
                : !!data[city]
                ? data[city].aqi
                : 0;

            newCityData[city] = [
              ...citiesLineDataObj[city],
              {
                x: newAQITime,
                y: currentCity === city ? data[city].aqi : previousAQIValue,
              },
            ].slice(-10);
          }
          setCitiesLineData(newCityData);
        }
      });
    }
  }, [data, cities, citiesLineData]);

  if (status === RequestStatus.LOADING) {
    return <p>Loading...</p>;
  }

  if (Object.keys(citiesLineData).length === 0) {
    return (
      <p>Not any data about selected cities has received. Please Wait...</p>
    );
  }

  const chartData = Object.keys(citiesLineData).map((city, index) => ({
    id: city,
    color: color.current[index],
    data: citiesLineData[city],
  }));

  return (
    <div className={style.line}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Time",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "AQI",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        tooltip={Tooltip}
      />
    </div>
  );
};

export default AQICityChart;

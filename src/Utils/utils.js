export const AQIColor = {
  GOOD: "#55a84f",
  SATISFACTORY: "#a2c853",
  MODERATE: "#fff832",
  POOR: "#f29c32",
  VERYPOOR: "#e93e33",
  SEVERE: "#af2d24",
};

export const RequestStatus = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  OPEN: "OPEN",
  CLOSE: "CLOSE",
};

export const getAQIColor = (aqi) => {
  return aqi <= 50
    ? AQIColor.GOOD
    : aqi <= 100
    ? AQIColor.SATISFACTORY
    : aqi <= 200
    ? AQIColor.MODERATE
    : aqi <= 300
    ? AQIColor.POOR
    : aqi <= 400
    ? AQIColor.VERYPOOR
    : AQIColor.SEVERE;
};

export const randomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

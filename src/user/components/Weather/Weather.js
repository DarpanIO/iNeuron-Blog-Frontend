import React from "react";
import './Weather.css'
const Weather = (props) => {
  
 const WeatherWidget = ()=>{
  window.myWidgetParam = window.myWidgetParam ? window.myWidgetParam :  [];
  window.myWidgetParam.push({
    id: 15,
    cityid: props.weatherData? props.weatherData.id:"",
    appid: props.weatherApiKey,
    units: "metric",
    containerid: "openweathermap-widget-15",
  });
  (function () {
    var script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src =
      "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(script, s);
  })();
}

  return (
    <div className='weatherContainer d-flex justify-content-center'>
      <div id="openweathermap-widget-15">
        {props.weatherData && WeatherWidget()}
      </div>
    </div>
  );
};

export default Weather;

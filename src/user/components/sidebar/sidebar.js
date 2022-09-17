import React,{useState} from 'react'
import CategoriesContainer from '../categories/categoriesContainer'
import Footer from '../Footer/footer'
import OurServices from '../ourServices/ourServices'
// import Weather from '../Weather/Weather'
import './sidebar.css'
const Sidebar = (props) => {
  //                          Weather Widget
  // const weatherApiKey = "d533311c006695b69223d759258241ae";
  // const geoLocationApiKey = "50ad4a90-fd5e-11ec-b463-1717be8c9ff1";
  // const [ip, setIP] = useState('')
  // const [weatherData, setweatherData] = useState(null)

    // const getData = async (pos) => {
    //     if(pos){
    //   const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${weatherApiKey}`)
    //   const parsedWeatherData = await weatherData.json()
    //   setweatherData(parsedWeatherData);
    //     }
    // }
    // useEffect(() => {
    //   navigator.geolocation.getCurrentPosition(getData);
    //   getData()
  
    // }, [])
  return (
    <div className="sidebar d-flex flex-column">
    {/* <Weather weatherData={weatherData} weatherApiKey={weatherApiKey} /> */}
    <CategoriesContainer ofType={props.ofType}/>
    {/* <OurServices /> */}
    <Footer />
  </div>
  )
}

export default Sidebar
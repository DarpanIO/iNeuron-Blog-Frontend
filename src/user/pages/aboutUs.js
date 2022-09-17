import React,{useEffect,useContext} from 'react'
import aboutContext from '../../context/aboutUs/aboutContext';
import TrusteeCard from '../components/trusteeCard/trusteeCard';
import "./aboutUs.css"

const AboutUs = () => {
  const context = useContext(aboutContext);
  const {description,fetchAboutUsDescription,getTrustee,trustees} = context;   
  useEffect(()=>{
    fetchAboutUsDescription();
    getTrustee();
  },[])
  return (
    <div className='about-us-main-body'>
      <h1>About Us</h1>
      <hr />
      <div
          className="about-description"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
        <br />
{/* {
  trustees.length>0 && 
  <div className="trustees">
  <h2>Trustees</h2>
  <hr />
  <div className="trustee-cards-client">
  {trustees.map((trustee)=>{
    return <TrusteeCard photo={trustee.photo?trustee.photo.images[0].location:""} name={trustee.name} position={trustee.position} description={trustee.description} key={trustee._id}/>
  })}
  </div>
  </div>
} */}
    </div>
  )
}

export default AboutUs
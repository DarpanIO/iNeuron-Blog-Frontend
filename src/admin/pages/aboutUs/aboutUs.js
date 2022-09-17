import React,{useContext,useEffect} from 'react'
import aboutContext from '../../../context/aboutUs/aboutContext';
import RichTextInputAbouUs from '../../components/richTextInputAboutUs/richtextInputAboutUs'
import Trustees from '../../components/trustees/trustees';

const AboutUs = (props) => {
    const setDashboardSideHidden=props.setDashboardSideHidden
    const context = useContext(aboutContext);
  const {description,fetchAboutUsDescription,setDescription,editAboutUsDescription} = context; 
  useEffect(() => {
    fetchAboutUsDescription()
    
  }, [])
  const handleClick=()=>{
    editAboutUsDescription()
  }
  
  return (
    <div className='w-100'>
    {setDashboardSideHidden(false)}
        <RichTextInputAbouUs description={description}
            value={description}
            setDescription={setDescription}
        />
        <button className='btn btn-primary m-2' onClick={handleClick}>Submit</button>

        <Trustees />

    </div>
  )
}

export default AboutUs
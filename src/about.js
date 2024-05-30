import React from 'react';
import wall4 from "./images/wallpaper2.jpg";
import Nav from './nav';
const AboutUs = () => {
  const styles = {
    aboutSection: {
      maxWidth: '800px',
      margin: '50px auto',
      padding: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px'
    },
    header: {
      textAlign: 'center',
      color: '#2c3e50'
    },
    aboutContent: {
      marginTop: '20px'
    },
    paragraph: {
      margin: '15px 0',
      lineHeight: '1.6',
      color: '#333'
    }
  };

  return (
    <>
    <Nav></Nav>
    <div className="image">
        <img className="registerImg" src={wall4}></img>
      <div className="myAccount" style={{top:"35%"}}>
        <h1 >About Us</h1>
        
        </div>
      </div>
    <div style={styles.aboutSection}>
      <h1 style={styles.header}>About Us</h1>
      <div style={styles.aboutContent}>
        <p style={styles.paragraph}>Our mission is to provide the highest quality agricultural products to our customers, ensuring sustainability and excellence in every step of the process.</p>
        <p style={styles.paragraph}>We envision a world where sustainable farming is the norm, and healthy, organic products are accessible to everyone.</p>
        
        <p style={styles.paragraph}>Our team is comprised of experienced farmers, agronomists, and passionate individuals who are dedicated to making a positive impact on agriculture.</p>
      </div>
    </div>
    </>
  );
};

export default AboutUs;

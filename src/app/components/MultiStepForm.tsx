 "use client"; // Mark the component as a Client Component

import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import styles from './MultiStepForm.module.css';

type CVData = {
  name: string;
  email: string;
  school: string;
  degree: string;
  job: string;
  company: string;
  skills: string;  
  courses: string;
  age: string;
  dob: string;
  nationality: string;
  languages: string;
  about: string;
  experience: string;
  profilePic: string | ArrayBuffer | null;
  address: string;
  phoneNumber: string;
};

const MultiStepForm: React.FC = () => {
  const [data, setData] = useState<CVData>({
    name: '',
    email: '',
    school: '',
    degree: '',
    job: '',
    company: '',
    skills: '',
    courses: '',
    age: '',
    dob: '',
    nationality: '',
    languages: '',
    about: '',
    experience: '',
    profilePic: null,
    address: '',
    phoneNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prevData) => ({
          ...prevData,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAIContent = async () => {
    const yearsOfExperience = parseInt(data.experience.split(' ').at(-1) || '0');
    const skillsString = data.skills;

    const aiGeneratedAbout = `A dedicated professional with ${yearsOfExperience} years of experience in ${skillsString}.`;
    const aiGeneratedExperience = `Over ${yearsOfExperience} years of professional experience in various roles, focusing on ${skillsString}.`;

    setData((prevData) => ({
      ...prevData,
      about: aiGeneratedAbout,
      experience: aiGeneratedExperience,
    }));
  };
  const downloadCV = () => {
  console.log('Download button clicked');
  console.log('Data: ', data);

  const doc = new jsPDF();
  const lineHeight = 8; // Set line height to 8

  // Ensure profilePic is in base64 format
  if (data.profilePic) {
    try {
      // Base64-encoded image data must start with `data:image/png;base64,`
      const imgData =
      typeof data.profilePic === 'string' && data.profilePic.startsWith('data:image/')
    ? data.profilePic
    : `data:image/png;base64,${data.profilePic}`;

      const imgSize = 50;
      doc.addImage(imgData, 'PNG', 15, 40, imgSize, imgSize);
    } catch (error) {
      console.error('Failed to add image: ', error);
    }
  } else {
    console.warn('No profile picture provided.');
  }

  let textYStart = 100;
  doc.setFontSize(22);
  doc.setFont('Helvetica', 'bold');
  doc.text('Curriculum Vitae', 20, textYStart - 80);
  doc.line(15, textYStart - 75, 195, textYStart - 75);
  
    
  doc.setFontSize(10); // Adjust the main font size
  doc.setFont('Helvetica', 'bold');
  doc.text('Contact ME', 20, textYStart);
  doc.setFont('Helvetica', 'normal');
  doc.text(`Phone Number: ${data.phoneNumber}`, 20, textYStart + lineHeight);
  doc.text(`Email: ${data.email}`, 20, textYStart + lineHeight * 2);
  doc.text(`Address: ${data.address}`, 20, textYStart + lineHeight * 3);
  doc.line(15, textYStart + lineHeight * 4, 195, textYStart + lineHeight * 4);

  doc.setFont('Helvetica', 'bold');
  doc.text('About', 20, textYStart + lineHeight * 5);
  doc.setFont('Helvetica', 'normal');
  doc.text(`Name: ${data.name}`, 20, textYStart + lineHeight * 6);
  doc.text(`Nationality: ${data.nationality}`, 20, textYStart + lineHeight * 7);
  doc.text(`Date of Birth: ${data.dob}`, 20, textYStart + lineHeight * 8);
  doc.text(`Age: ${data.age}`, 20, textYStart + lineHeight * 9);
  doc.line(15, textYStart + lineHeight * 10, 195, textYStart + lineHeight * 10);

  doc.setFont('Helvetica', 'bold');
  doc.text('Education', 20, textYStart + lineHeight * 11);
  doc.setFont('Helvetica', 'normal');
  doc.text(`School: ${data.school}`, 20, textYStart + lineHeight * 12);
  doc.text(`Degree: ${data.degree}`, 20, textYStart + lineHeight * 13);
  doc.text(`Courses: ${data.courses}`, 20, textYStart + lineHeight * 14);
  doc.line(15, textYStart + lineHeight * 15, 195, textYStart + lineHeight * 15);

  doc.setFont('Helvetica', 'bold');
  doc.text('Experience & Skills', 20, textYStart + lineHeight * 16);
  doc.setFont('Helvetica', 'normal');
  doc.text(`Job: ${data.job}`, 20, textYStart + lineHeight * 17);
  doc.text(`Company: ${data.company}`, 20, textYStart + lineHeight * 18);
  doc.text(`Languages: ${data.languages}`, 20, textYStart + lineHeight * 19);
  doc.text(`Experience: ${data.experience}`, 20, textYStart + lineHeight * 20);
  doc.text(`Skills: ${data.skills}`, 20, textYStart + lineHeight * 21);
  doc.line(15, textYStart + lineHeight * 22, 195, textYStart + lineHeight * 22); // Line after Skills
  doc.line(15, textYStart + lineHeight * 23, 195, textYStart + lineHeight * 23); // Additional line for separation

  doc.save('CV.pdf');
};

  return (
    <div
      style={{
        display: 'flex',
        padding: '10px',
        backgroundImage: 'linear-gradient(to right, #f7f7f7 0%, #194905ce 50%)',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          padding: '10px',
          backgroundImage: 'linear-gradient(to right, #f7f7f7 0%, #194905ce 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '600px',
          margin: 'auto',
          color: '#333',
          width: '50%',
        }}
      >
        <h2 style={{ marginBottom: '20px', fontSize: '28px', fontWeight: 'bold', color: '#000' }}>
          Curriculum Vitae
        </h2>
        <form className={styles.form} style={{ width: '100%' }} onSubmit={(e) => e.preventDefault()}>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          <input
             type="text"
             name="address"
             placeholder="Address"
             value={data.address}
             onChange={handleInputChange}
             className={styles.input}
           />
          <textarea
            name="about"
            placeholder="About yourself (Generate it with AI)"
            value={data.about}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="school"
            placeholder="School"
            value={data.school}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={data.degree}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={data.phoneNumber}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="job"
            placeholder="Job Title"
            value={data.job}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={data.company}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma-separated)"
            value={data.skills}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="courses"
            placeholder="Courses (comma-separated)"
            value={data.courses}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={data.age}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={data.dob}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            value={data.nationality}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="languages"
            placeholder="Languages (comma-separated)"
            value={data.languages}
            onChange={handleInputChange}
            className={styles.input}
          />
           <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={data.experience}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.input}
          />
          <button type="button" onClick={generateAIContent} className={styles.button}>
            Generate AI Content
          </button>
          <button type="button" onClick={downloadCV} className={styles.button}>
            Download CV
          </button>
        </form>
      </div>
      <div style={{ width: '50%', padding: '20px' }}>
        {/* CV preview */}       
      <div style={{ width: '50%', padding: '20px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#000', textAlign: 'center' }}>
          CV Preview
        </h2>
        <div style={{ marginTop: '20px' }}>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>School:</strong> {data.school}</p>
          <p><strong>Degree:</strong> {data.degree}</p>
          <p><strong>Job:</strong> {data.job}</p>
          <p><strong>Company:</strong> {data.company}</p>
          <p><strong>Skills:</strong> {data.skills}</p>
          <p><strong>Age:</strong> {data.age}</p>
          <p><strong>Date of Birth:</strong> {data.dob}</p>
          <p><strong>Nationality:</strong> {data.nationality}</p>
          <p><strong>Languages:</strong> {data.languages}</p>
          <p><strong>Address:</strong> {data.address}</p> {/* Display the address */}
          <p><strong>About:</strong> {data.about}</p>
          <p><strong>Experience:</strong> {data.experience}</p>
          {data.profilePic && (
           <img
           src={data.profilePic as string}
           alt="Profile"
           style={{ width: '100px', borderRadius: '50%', marginTop: '10px' }}
         />
       )}
      
        </div>
      </div>
    </div>
      </div>
  );
}

export default MultiStepForm;

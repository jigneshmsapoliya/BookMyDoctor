import React, { useState } from 'react';
import { Card, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';

import '../../node_modules/react-bootstrap/';
import '../bootstrap.min.css';

const doctorsData = [
    {
      id: 1,
      name: 'Dr. Amanda Rodriguez',
      specialization: 'Cardiologist',
      description: 'Specializes in diagnosing and treating diseases or conditions of the heart and blood vessels.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9jdG9yfGVufDB8fDB8fHww'
    },
    {
      id: 2,
      name: 'Dr. Michael Johnson',
      specialization: 'Pediatrician',
      description: 'Dedicated to providing medical care for infants, children, and adolescents.',
      image: 'https://images.unsplash.com/photo-1631217871099-88310a909a32?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      name: 'Dr. Sarah Lee',
      specialization: 'Dermatologist',
      description: 'Expert in diagnosing and treating skin disorders, including acne, eczema, and psoriasis.',
      image: 'https://plus.unsplash.com/premium_photo-1681996484614-6afde0d53071?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      id: 4,
      name: 'Dr. Christopher Wang',
      specialization: 'Orthopedic Surgeon',
      description: 'Specializes in treating injuries and disorders of the musculoskeletal system.',
      image: 'https://images.unsplash.com/photo-1536064479547-7ee40b74b807?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGRvY3RvcnxlbnwwfDB8MHx8fDI%3D'
    },
    {
      id: 5,
      name: 'Dr. Emily Martinez',
      specialization: 'Neurologist',
      description: 'Focuses on diagnosing and treating disorders of the nervous system, including the brain and spinal cord.',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yfGVufDB8MHwwfHx8Mg%3D%3D'
    },
    {
      id: 6,
      name: 'Dr. David Brown',
      specialization: 'Ophthalmologist',
      description: 'Specializes in eye and vision care, including diagnosing and treating eye diseases.',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRvY3RvcnxlbnwwfDB8MHx8fDI%3D'
    },
    {
      id: 7,
      name: 'Dr. Jennifer Garcia',
      specialization: 'Gynecologist',
      description: 'Provides medical care related to the female reproductive system and women’s health.',
      image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRvY3RvcnxlbnwwfDB8MHx8fDI%3D'
    },
    {
      id: 8,
      name: 'Dr. Matthew Robinson',
      specialization: 'Psychiatrist',
      description: 'Specializes in diagnosing and treating mental disorders, such as depression, anxiety, and schizophrenia.',
      image: 'https://images.unsplash.com/photo-1590611936760-eeb9bc598548?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 9,
      name: 'Dr. Elizabeth White',
      specialization: 'Endocrinologist',
      description: 'Specializes in diagnosing and treating disorders of the endocrine system, including diabetes and thyroid disorders.',
      image: 'https://images.unsplash.com/photo-1585559604920-924ba42079bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGRvY3RvcnxlbnwwfDB8MHx8fDI%3D'
    },
    {
      id: 10,
      name: 'Dr. Daniel Taylor',
      specialization: 'Urologist',
      description: 'Specializes in diagnosing and treating diseases of the urinary tract and male reproductive system.',
      image: 'https://images.unsplash.com/photo-1612776572997-76cc42e058c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGRvY3RvcnxlbnwwfDB8MHx8fDI%3D'
    },
  ];
  
  const DoctorCard = ({ doctor }) => {
    return (
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={doctor.image} />
        <Card.Body>
          <Card.Title>{doctor.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{doctor.specialization}</Card.Subtitle>
          <Card.Text>{doctor.description}</Card.Text>
          <Button variant="primary" onClick={""}>Book Appointment</Button>
        </Card.Body>
      </Card>
    );
  };
  
  const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredDoctors = doctorsData.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <Container>
        <Row className="justify-content-center mt-4">
          <Col md={6}>
            <Form inline className="justify-content-center">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                value={searchTerm}
                onChange={handleChange}
              />
              {/* <Button variant="outline-primary">Search</Button> */}
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          {filteredDoctors.map((doctor) => (
            <Col key={doctor.id}>
              <DoctorCard doctor={doctor} />
            </Col>
          ))}
        </Row>

        
      </Container>
      
    );
  };

  
  export default Home;
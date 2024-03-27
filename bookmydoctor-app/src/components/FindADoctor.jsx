import React, { useState } from 'react';
import { useQuery,gql } from '@apollo/client';
import { Card, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';

import '../../node_modules/react-bootstrap/';
import '../bootstrap.min.css';

const GET_DOCTORS = gql`
  query {
    doctors {
      _id
      firstName
      lastName
      specialization
      education
      imgUrl
    }
  }
`;
  
  const DoctorCard = ({ doctor }) => {
    return (
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={doctor.imgUrl} />
        <Card.Body>
          <Card.Title>{doctor.firstName}{doctor.lastName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{doctor.specialization}</Card.Subtitle>
          <Card.Text>{doctor.education}</Card.Text>
          <Button variant="primary" onClick={""}>Book Appointment</Button>
        </Card.Body>
      </Card>
    );
  };
  
  const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const{loading, error, data} = useQuery(GET_DOCTORS)
  
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredDoctors = data?.doctors?.filter((doctor) =>
    doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase())  ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
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
              
            </Form>
          </Col>
        </Row>

        {loading && <p>Loading doctors...</p>}
      {error && <p>Error fetching doctors: {error.message}</p>}

        {data && (
        <Row className="justify-content-center mt-4">
          {filteredDoctors.map((doctor) => (
            <Col key={doctor._id}>
              <DoctorCard doctor={doctor} />
            </Col>
          ))}
        </Row>
        )}

{!data && !loading && !error && <p>No doctors found.</p>}
      </Container>
      
    );
  };

  
  export default Home;

import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Card, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
        <Link to={`/doctor/${doctor._id}`} className="btn btn-primary">Book Appointment</Link>
      </Card.Body>
    </Card>
  );
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data } = useQuery(GET_DOCTORS)

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDoctors = data?.doctors?.filter((doctor) =>
    doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23343a40' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' height='24' width='24'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPositionX: 'calc(100% - 8px)', backgroundPositionY: '50%' }}
            />

          </Form>
        </Col>
      </Row>

      {loading && <p>Loading doctors...</p>}
      {error && <p>Error fetching doctors: {error.message}</p>}

      {data && (
        <Row className="justify-content-center mt-4">
          {filteredDoctors.map((doctor) => (
            <Col key={doctor.id}>
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
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

const AdminDashboard = () => {
    const appointmentsToday = 15; // Assume 15 appointments for today

    return (
        <Container className="mt-4 dashboard-container">
            <Row className="justify-content-start">

                <Col className="alert-container">
                    <h2>Hello Admin!</h2>
                </Col>

            </Row>

            <Row className="mt-4">
                <Col md={6} className="mb-3">
                    <div className="square-block">
                        <h4>Add Doctor</h4>
                        <Link to="/admin/addDoctor" className="btn btn-primary bg-gradient">Add Doctor</Link>
                    </div>
                </Col>
                <Col md={6} className="mb-3">
                    <div className="square-block">
                        <h4>Add Doctor's Appointments</h4>
                        <Link to="/admin/timeslot" className="btn btn-secondary">Add Appointment dates</Link>
                    </div>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={6} className="mb-3">
                    <div className="square-block">
                        <h4>Update Appointment</h4>
                        <Button variant="danger">Update Appointment</Button>
                    </div>
                </Col>
                <Col md={6} className="mb-3">
                    <div className="square-block">
                        <h4>Remove Appointments</h4>
                        <Button variant="secondary">Remove Appointment</Button>
                    </div>
                </Col>
            </Row>

            <Row className="mt-4 update-container">
                <Col>
                    <h3>Latest Update</h3>
                    <p>
                        BookMyDoctor team in Montreal and Halifax recently donated $100,000 towards pediatric cancer research and
                        support services, igniting hope and compassion within our communities. February 15, 2024, marked
                        International Childhood Cancer Day, which raises awareness of childhood cancer and how to support children,
                        adolescents, survivors, and their families. In Canada, nearly 1,000 children receive a cancer diagnosis
                        annually, and almost 84% of children survive cancer five years after diagnosis. That rate that is expected
                        to improve with advancements in treatment.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;

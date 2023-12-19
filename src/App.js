// src/App.js
import React, { useState } from "react";
import { Button, Container, Row, Form, Col, Card } from "react-bootstrap";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import PricingModal from "./components/pricingModal";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [userCount, setUserCount] = useState(0);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSliderChange = (value) => setUserCount(value);
  const handleSubmit = async (values) => {
    fetch("https://forms.maakeetoo.com", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(values),
    })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (res) {
        console.log(res);
      });
  };
  const renderPricingCards = () => {
    const pricingPlans = [
      {
        type: "Free",
        price: "$0",
        features: ["10 users included", "2 GB of storage", "Email support"],
        highlightPlan: "0-10",
      },
      {
        type: "Pro",
        price: "$15",
        features: [
          "20 users included",
          "10 GB of storage",
          "Priority email support",
        ],
        highlightPlan: "10-20",
      },
      {
        type: "Enterprise",
        price: "$29",
        features: [
          "30 users included",
          "30 GB of storage",
          "Phone and email support",
        ],
        highlightPlan: "20-30",
      },
    ];
    const getplanVariant = (type) => {
      switch (type) {
        case "Free":
          if (userCount > 10) {
            return "info";
          }
          return "primary";
        case "Pro":
          if (userCount == 20) {
            return "primary";
          }
          return "info";
        case "Enterprise":
          if (userCount == 30) {
            return "primary";
          }
          return "info";
        default:
          break;
      }
    };

    return pricingPlans.map((plan, index) => (
      <Col key={index} className="mb-4">
        <Card className="h-100">
          <Card.Header
            as="h4"
            className="d-flex justify-content-between align-items-center bg-primary text-white"
          >
            {plan.type}
            <span className="badge badge-light">{plan.price}</span>
          </Card.Header>
          <Card.Body>
            <ul className="list-unstyled">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>
          </Card.Body>
          <Card.Footer className="text-center">
            <Button
              variant={getplanVariant(plan.type)}
              onClick={handleShowModal}
            >
              Get started
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    ));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center mb-4">Pricing</h1>
        </Col>
      </Row>

      <Row>{renderPricingCards()}</Row>

      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <div className="mb-5">
            <Form.Label>Select Number of Users</Form.Label>
            <Slider
              min={0}
              max={30}
              step={10}
              onChange={handleSliderChange}
              value={userCount}
            />
            <p>Selected Users: {userCount}</p>
          </div>
        </Col>
      </Row>

      <PricingModal
        handleSubmit={(vals) => handleSubmit(vals)}
        show={showModal}
        handleClose={handleCloseModal}
      />
    </Container>
  );
};

export default App;

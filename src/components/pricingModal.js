// src/components/PricingModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const PricingModal = ({ show, handleClose, handleSubmit }) => {
  const [formValues, setFormValues] = useState({
    formName: "",
    formEmail: "",
    formOrderComments: "",
  });
  const submitForm = () => {
    handleClose();
    handleSubmit(formValues);
    resetForm();
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [id]: value,
    }));
  };

  const resetForm = () => {
    setFormValues({
      formName: "",
      formEmail: "",
      formOrderComments: "",
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={formValues.formName}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={formValues.formEmail}
              type="email"
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group controlId="formOrderComments">
            <Form.Label>Order Comments</Form.Label>
            <Form.Control
              value={formValues.formOrderComments}
              as="textarea"
              rows={3}
              placeholder="Enter order comments"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={submitForm}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PricingModal;

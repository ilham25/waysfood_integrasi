import { useState, useContext } from "react";

import { Modal, Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Components
import CustomFormInput from "../reusable/CustomFormInput";

// State Management
import { UserContext } from "../../contexts/userContext";

// API
import { API, setAuthToken } from "../../utils/api";

// Validations
import { registerSchema } from "../../utils/validations";

export default function RegisterModal({
  showRegister,
  handleCloseRegister,
  handleShowLogin,
}) {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const openLogin = () => {
    handleCloseRegister();
    handleShowLogin();
  };

  const handleRegister = async (data) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await API.post("/register", data, config);
      console.log(response.data);
      userDispatch({
        type: "LOGIN",
        payload: response.data.data.user,
      });
      setAuthToken(response.data.data.user.token);

      handleCloseRegister();
    } catch (error) {
      return console.log(error?.response?.data?.message);
    }
  };

  return (
    <Modal
      show={showRegister}
      onHide={handleCloseRegister}
      dialogClassName="form-modal"
    >
      <Modal.Body className="px-4 py-5">
        <h2 className="text-warning mb-4">Register</h2>
        <Form
          className="d-flex flex-column"
          onSubmit={handleSubmit(handleRegister)}
        >
          <Form.Group controlId="email">
            <Controller
              as={
                <CustomFormInput
                  type="email"
                  placeholder="Email"
                  isInvalid={!!errors.email}
                  ref={register}
                />
              }
              name="email"
              control={control}
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="password">
            <Controller
              as={
                <CustomFormInput
                  type="password"
                  placeholder="Password"
                  ref={register}
                  isInvalid={!!errors.password}
                />
              }
              name="password"
              control={control}
            />

            {errors.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="fullName">
            <Controller
              as={
                <CustomFormInput
                  type="text"
                  placeholder="Full Name"
                  ref={register}
                  isInvalid={!!errors.fullName}
                />
              }
              name="fullName"
              control={control}
            />
            {errors.fullName && (
              <Form.Control.Feedback type="invalid">
                {errors.fullName?.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="phone">
            <Controller
              as={
                <CustomFormInput
                  type="text"
                  placeholder="Phone"
                  ref={register}
                  isInvalid={!!errors.phone}
                />
              }
              name="phone"
              control={control}
            />

            {errors.phone && (
              <Form.Control.Feedback type="invalid">
                {errors.phone?.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="gender">
            <Controller
              as={
                <Form.Control
                  as="select"
                  style={{
                    height: "50px",
                    boxShadow: "none",
                    backgroundColor: "rgba(210, 210, 210, 0.25)",
                    border: "3px solid #D2D2D2",
                    color: "#6c757d",
                  }}
                  ref={register}
                  isInvalid={!!errors.gender}
                  value="male"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="-">-</option>
                </Form.Control>
              }
              name="gender"
              control={control}
            />
            {errors.gender && (
              <Form.Control.Feedback type="invalid">
                {errors.gender?.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="role">
            <Controller
              as={
                <Form.Control
                  as="select"
                  style={{
                    height: "50px",
                    boxShadow: "none",
                    backgroundColor: "rgba(210, 210, 210, 0.25)",
                    border: "3px solid #D2D2D2",
                    color: "#6c757d",
                  }}
                  ref={register}
                  isInvalid={!!errors.role}
                  value="user"
                >
                  <option value="user">As User</option>
                  <option value="partner">As Partner</option>
                </Form.Control>
              }
              control={control}
              name="role"
            />
            {errors.role && (
              <Form.Control.Feedback type="invalid">
                {errors.role?.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button variant="brown" type="submit" className="mb-3">
            Register
          </Button>
          <Form.Text className="text-muted text-center">
            Already have an account ? Click{" "}
            <a
              href="#!"
              className="font-weight-bold text-secondary"
              onClick={openLogin}
            >
              Here
            </a>
          </Form.Text>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

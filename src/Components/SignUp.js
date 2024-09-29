import React, { useState } from "react";
import { Box, Button, Input, Typography } from "@mui/joy";
import logo from "../assets/logo2.png";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    nationality: "",
    gender: "",
    info: "",
  //  adding new
    cnic:"",
    dob:""

  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Signup successful!");
      } else {
        const result = await response.json();
        setError(result.message || "Signup failed");
      }
    } catch (error) {
      setError("An error occurred during signup");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", bgcolor: "background.level1" }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", p: 2, bgcolor: "background.surface" }}>
        <img src={logo} alt="E-bank" style={{ height: "40px" }} />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Link to="/login">
            <Button variant="solid">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outlined">Sign up</Button>
          </Link>
        </Box>
      </Box>
      <Box sx={{ width: "90%", maxWidth: "500px", mt: 4, p: 3, borderRadius: "md", boxShadow: "md", bgcolor: "background.surface" }}>
        <img src={logo} alt="E-bank" style={{ height: "50px", marginBottom: "16px" }} />
        <Typography level="h2" component="h2" sx={{ mb: 1 }}>D-Pay</Typography>
        <Typography level="h3" component="h3" sx={{ mb: 3 }}>Create an Account</Typography>
        <form onSubmit={handleSubmit}>
          {[
            { label: "First Name", name: "fname", type: "text" },
            { label: "Last Name", name: "lname", type: "text" },
            { label: "E-mail", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Confirm Password", name: "confirmPassword", type: "password" },
            { label: "Nationality", name: "nationality", type: "text" },
            { label: "Gender", name: "gender", type: "text" },
            { label: "info", name: "info", type: "text" },
            { label: "cnic", name: "cnic", type: "text" },
            { label: "dob", name: "dob", type: "date" }
          ].map((field, index) => (
            <Input
              key={index}
              type={field.type}
              name={field.name}
              placeholder={field.label}
              value={formData[field.name]}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
          ))}

          <Button type="submit" variant="solid" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign up
          </Button>
        </form>
        {error && <Typography level="body2" color="danger" sx={{ mt: 2 }}>{error}</Typography>}
      </Box>
    </Box>
  );
};

export default Signup;

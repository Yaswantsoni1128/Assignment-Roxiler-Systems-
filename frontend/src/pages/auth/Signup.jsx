import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    // Name validation (20-60 chars)
    if (form.name.length < 20 || form.name.length > 60) {
      newErrors.name = "Name must be 20-60 characters";
    }

    // Address validation (max 400)
    if (form.address.length > 400) {
      newErrors.address = "Address max length is 400";
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;

    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "8-16 chars, 1 uppercase, 1 special char required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // TODO: API call
    console.log("Signup Data:", form);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] p-6 border rounded shadow"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name (20-60 chars)"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

        <textarea
          name="address"
          placeholder="Enter Address (max 400 chars)"
          value={form.address}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.address && (
          <p className="text-red-500">{errors.address}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password}</p>
        )}

        <button className="w-full bg-green-500 text-white p-2 rounded mt-2">
          Register
        </button>

        <p className="text-sm mt-3 text-center">
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
}
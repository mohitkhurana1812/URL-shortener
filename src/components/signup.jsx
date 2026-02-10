import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Error from "./error";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";
import useFetch from "../hooks/use-fetch";
import { login, signup } from "../db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authState } from "../context";
import { File } from "lucide-react";

const Signup = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const { data, error, loading, fn: fnsignUp } = useFetch(signup, formData);
  const { fetchUser } = authState();
  const handleInputChange = (e) => {
    debugger;
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invlaid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnsignUp();
    } catch (err) {
      const newErrors = {};

      err?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };
  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [error, data]);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            Create a new account if you haven&rsquo;t already
          </CardDescription>
          {errors && <Error message={errors.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              name="name"
              type="text"
              placeholder="Enter Name"
              onChange={handleInputChange}
            />
          </div>
          {errors.name && <Error message={errors.name} />}
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={handleInputChange}
            />
          </div>
          {errors.email && <Error message={errors.email} />}
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
            />
          </div>
          {errors.password && <Error message={errors.password} />}
          <div className="space-y-1">
            <input
              name="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="block w-full cursor-pointer rounded-md border border-gray-300
               pl-10 pr-3 py-2 text-sm file:hidden"
              />
          </div>
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignup}>
            {loading ? (
              <BeatLoader size={10} color="#36d7b7" />
            ) : (
              "Create Account"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;

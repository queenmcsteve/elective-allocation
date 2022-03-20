import React from "react";
import "../App.css";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../utils/mutations";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: () => {
      // add payload; set user in localstorage; create user context; dispatch login mutation; navigate to admindash; authenticate using the token
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const submitForm = async (formData) => {
    const { username, password } = formData;
    try {
      console.log(formData);
      await login({
        variables: {
          username,
          password,
        },
      });
    } catch (error) {
      console.error(error);
      return <div>wrong password</div>;
    }
  };

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error $$$</div>;
  }

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit(submitForm)}>
        <label>
          <p>Username</p>
          <input type="text" {...register("username", { required: true })} />
          {errors?.username && <div>This field is required</div>}
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            {...register("password", { required: true })}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
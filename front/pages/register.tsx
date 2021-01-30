import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";

import Container from "../components/container/Container";
import Input from "../components/form/fields/Input";
import Form from "../components/form/Form";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface Errors {
  username?: string;
  password?: string;
}

interface Fields {
  username: string;
  password: string;
}

const validate = (values: Fields) => {
  const errors: Errors = {};
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length > 15) {
    errors.username = "Must be 15 characters or less";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be 20 characters or less";
  }

  return errors;
};

const Register: React.FC = () => {
  const router = useRouter();
  const [register, { data }] = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    // validate,
    onSubmit: async (values, { setErrors }) => {
      const response = await register({ variables: values });

      if (response.data?.register.errors) {
        setErrors(toErrorMap(response.data.register.errors));
      } else if (response.data?.register.user) {
        router.push("/");
      }
    }
  });

  return (
    <Container>
      <Link href="/">Go Back mordo</Link>
      <Container isSmall noGutter>
        <Form
          onSubmit={formik.handleSubmit}
          submitLabel="submit"
          isSubmitting={formik.isSubmitting}
        >
          <Input
            label="Username"
            name="username"
            placeholder="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            error={formik.errors.username}
          />
          <Input
            label="Pass"
            name="password"
            placeholder="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.errors.password}
          />
        </Form>
      </Container>
    </Container>
  );
};

export default Register;

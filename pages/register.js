import { ErrorMessage, Field, Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { register } from "../actions/auth";
import * as Yup from "yup";
import { getError } from "../utils/utils";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default function Login() {
  const disabled = false;
  const registerMutation = useMutation((registerDetails) => {
    return register(
      registerDetails.email,
      registerDetails.password,
      registerDetails.confirm_password
    );
  });

  return (
    <div>
      <Head>
        <title>Login | OrderIt</title>
        <meta name="description" content="OrderIt Food Ordering Service" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className="min-h-screen bg-white flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          {/* Main Start */}
          <main className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              {/* <img
        className="h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="OrderIt"
      /> */}
              <Link href="/" className="text-indigo-600 font-bold text-2xl">
                OrderIt
              </Link>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Register for your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Already registered?{" "}
                <Link
                  href="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Login here
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  confirm_password: "",
                }}
                onSubmit={(values) => {
                  (async () => {
                    try {
                      await registerMutation.mutateAsync(values);
                      Swal.fire(
                        "Registration Successful",
                        "Please proceed to your mail to activate your account",
                        "success"
                      );
                    } catch (error) {
                      Swal.fire(
                        "Registration Error",
                        getError(error) ?? "Could not complete registration",
                        "error"
                      );
                    }
                  })();
                }}
                validationSchema={RegisterSchema}
              >
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <ErrorMessage name="password" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="confirm_password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-1">
                      <Field
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <ErrorMessage name="confirm_password" />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={disabled}
                    >
                      Register
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </main>

          {/* Main End */}
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <div className="absolute inset-0 h-full w-full bg-indigo-100"></div>
        </div>
      </div>
    </div>
  );
}

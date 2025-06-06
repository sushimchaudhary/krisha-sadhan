'use client'
import { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

interface ForgotPasswordValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const initialValues: ForgotPasswordValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
  });

const handleSubmit = async (
  values: ForgotPasswordValues,
  { setSubmitting }: FormikHelpers<ForgotPasswordValues>
) => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/auth/forgot-password',
      { email: values.email }
    );

    setSuccessMessage(res.data.message);
    setErrorMessage('');

    const token = res.data.resetToken;

    if (token) {
      setTimeout(() => {
        router.push(`/auth/reset-password/${token}`);
      }, 1000);
    } else {
      setErrorMessage('No reset token received from server');
    }

  } catch (err: any) {
    setErrorMessage(err.response?.data?.message || 'Something went wrong');
    setSuccessMessage('');
  }
  setSubmitting(false);
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>

        {successMessage && (
          <div className="text-green-600 text-center mb-4">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-600 text-center mb-4">{errorMessage}</div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email Address
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded-md text-white transition duration-200 ${
                  isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                Send Reset Link
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;

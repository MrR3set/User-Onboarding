import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

const UserForm = ({values, errors}) => {


    return(
        <div className="user-form">
            <Form>
                <label htmlFor="name">
                    Name
                    <Field id="name" type="text" name="name" placeholder="User name"/>
                </label>
                <label htmlFor="Email">
                    Email
                    <Field id="email" type="email" name="email" placeholder="Email"/>
                </label>
                <label htmlFor="password">
                    Password
                    <Field id="password" type="password" name="password" placeholder=""/>
                </label>
                <label className="checkbox-container">
                    Terms of service
                    <Field type="checkbox" name="terms" checked={values.terms}/>
                    <span className="checkmark"/>
                </label>
                <button type="submit">Submit</button>
            </Form>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
        </div>
    )
}


const FormikUserForm = withFormik({
    mapPropsToValues(props){
        return({
            name: props.name || "",
            email: props.email || "",
            password: props.password || "",
            terms: props.terms || false
        })
    },validationSchema: yup.object().shape({
        name: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().required(),
        terms: yup.string().required(),
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        console.log("submitting", values);
        axios
          .post("https://reqres.in/api/users/", values)
          .then(res => {
            console.log("success", res);
            // sends a status update through props in AnimalForm with value as res.data content
            setStatus(res.data);
            //clears form inputs, from FormikBag
            resetForm();
          })
          .catch(err => console.log(err.response));
      }
})(UserForm);




export default FormikUserForm;

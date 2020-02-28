import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

const UserForm = ({values, errors, status, touched}) => {
    
    const [user, setUser] = useState([]);

  // listens for status changes to update animals state
  useEffect(() => {
    status && setUser(user => [...user, status]);

    //maybe we can send this shit somewhere?
  }, [status]);


    return(
        <div className="user-form">
            <Form>
                <label htmlFor="name">
                    Name
                    <Field id="name" type="text" name="name" placeholder="User name"/>
                    {touched.name && errors.name && (
                        <p className="errors">{errors.name}</p>
                    )}
                </label>
                <label htmlFor="Email">
                    Email  
                    <Field id="email" type="email" name="email" placeholder="Email"/>
                    {touched.email && errors.email && (
                        <p className="errors">{errors.email}</p>
                    )}
                </label>
                <label htmlFor="password">
                    Password  
                    <Field id="password" type="password" name="password" placeholder=""/>
                    {touched.password && errors.password && (
                        <p className="errors">{errors.password}</p>
                    )}
                </label>
                <label className="checkbox-container">
                    Terms of service  
                    <Field type="checkbox" name="terms" checked={values.terms}/>
                    <span className="checkmark"/>
                </label>
                <button type="submit">Submit</button>
            </Form>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}

            {user.map(user=>{
                return (
                    <ul key={user.id} className="users">
                        <li>Name: {user.name}</li>
                        <li>Email: {user.email}</li>
                        <li>Password: {user.password}</li>
                    </ul>
                )
            })}
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues(props){  
        console.log("props",props);
        return({
            name: props.name || "",
            email: props.email || "",
            password: props.password || "",
            terms: props.terms || false
        })
    },validationSchema: yup.object().shape({
        name: yup.string().required("Whats your name lad? How imma supposed to knoe you?"),
        email: yup.string().required("Bruuuuuh I ddont know your emailll?!"),
        password: yup.string().required("Ill set it to 123 would you like that? No then put a frickin password!"),
        terms: yup.string().required("Check that I dont want any legal thingyes on me"),
    }),
    handleSubmit(values, { setStatus, resetForm },props) {
        console.log("submitting");
        axios
          .post("https://reqres.in/api/users/", values)
          .then(res => {
              setStatus(res.data);
              resetForm();
          })
          .catch(err => console.log(err.response));
      }
})(UserForm);




export default FormikUserForm;

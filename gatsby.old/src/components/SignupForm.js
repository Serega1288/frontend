import React, {useState} from "react";
import styled from "styled-components";
import FormStyles from "../styles/FormStyles";
import useForm from "../hooks/useForm";

const SignupForm = () => {

    const { values, captureInput, submitForm, isLoading, error, message } = useForm();

    return (
        <Container>
            <FormStyles onSubmit={submitForm}>
                <input
                    disabled={isLoading}
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={captureInput} />
                <input
                    disabled={isLoading}
                    type="garbage"
                    name="garbage"
                    className="garbage"
                    value={values.garbage}
                    onChange={captureInput} />
                <button disabled={isLoading} type="submit">
                    { isLoading ? 'Відправляю запит' :  'Відправити'  }
                </button>
            </FormStyles>
            <div>
                {error ? <span className="formError">Помилка: {error} </span>  : ''}
                {message ? <span className="formMessaga">{message} </span>  : ''}
            </div>
        </Container>
    )
};
export default SignupForm;

const Container = styled.div``;
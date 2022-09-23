import {useState} from "react";

const useForm = () => {
    const [values, setValues] = useState({email: '', garbage: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);



    const captureInput = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
        // console.log('name > ', e.target.name )
        // console.log('value > ', e.target.value )
    }

    const submitForm = async e => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);
        setError(null);

        const res = await fetch(`${process.env.GATSBY_SERVERLESS_URL}/sendEmail`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({email: values.email, garbage: values.garbage}),
        });

        const responseText = JSON.parse(await res.text() );

        console.log('responseText >>>', responseText);

        // 2. перевіряємо відповідь від сервера
        if (res.status >= 400 && res.status < 600 ) {
            setIsLoading(false);
            setError(responseText.message);
        } else {
            // 3. емайл успішно відправлений
            setIsLoading(false);
            setValues({
                ...values,
                email: '',
                garbage: '',
            });
            setMessage('Ви успішно підписалися');

        }

        console.log(' values >>>', values);
    }

    return {
        values,
        captureInput,
        submitForm,
        isLoading,
        error,
        message
    }
}

export default useForm;
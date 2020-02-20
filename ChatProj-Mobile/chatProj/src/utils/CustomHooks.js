import {
    useState
} from 'react';
const useSignUpForm = (callback) => {
    const [inputs, setInputs] = useState({});

    const handleSubmit = (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        console.log(inputs);
        callback(inputs);
    }
    const handleInputChange = (event) => {
        /* Chequeo si la función existe en el evento que llega. 
           Porque en muchos componentes personalizados o de frameworks,
           los eventos de los mismos no la tienen */
        if (event.persist) {
            event.persist();
        }
        setInputs(inputs => ({
            ...inputs,
            [event.target.name]: event.target.value
        }));
    }
    return {
        handleSubmit,
        handleInputChange,
        inputs
    };

}
export default useSignUpForm;
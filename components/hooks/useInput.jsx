import { useState } from "react";

export default function useInput(defaltValue, validationFn) {
    const [enteredInput, setEnteredInput] = useState(defaltValue);
    const [didBlur, setDidBlur] = useState(false)

    const valueIsValid = validationFn(enteredInput)

    const handleChangeInput = function (e) {
        setEnteredInput(e.target.value);
        setDidBlur(false)
    };

    const handleInputBlur = function () {
        setDidBlur(true)
    };

    return {
        value: enteredInput,
        handleChangeInput,
        handleInputBlur,
        hasError: didBlur && !valueIsValid
    }
}
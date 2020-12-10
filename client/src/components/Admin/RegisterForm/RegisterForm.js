import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import "./RegisterForm.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import {
    emailValidation,
    minLengthValidation
} from "../../../utils/formValidation";
import { signUpApi } from "../../../api/user";
export default function RegisterForm() {


    const [inputs, setinputs] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
    });
    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    })
    const changeForm = e => {
        if (e.target.name === "privacyPolicy") {
            setinputs({
                ...inputs,
                [e.target.name]: e.target.checked
            });
        } else {
            setinputs({
                ...inputs,
                [e.target.name]: e.target.value
            })
        }
    }

    const inputValidation = e => {
        const { type, name, value } = e.target;
        if (type === "email") {
            setFormValid({
                ...formValid, [name]: emailValidation(e.target)
            });
        }
        if (type === "password") {
            setFormValid({
                ...formValid, [name]: minLengthValidation(e.target, 8)
            });
        }
        if (type === "checkbox") {
            setFormValid({
                ...formValid, [name]: e.target.checked
            });
        }
    }

    const register = async () => {
        
        const emailVal = inputs.email;
        const passwordVal = inputs.password;
        const repeatPasswordVal = inputs.repeatPassword;
        const privacyPolicyVal = inputs.privacyPolicy;
        if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
            notification["error"]({
                message: "Todos los compos son obligatorios"
            });
        } else {
            if (passwordVal !== repeatPasswordVal) {
                notification["error"]({
                    message: "Las contraseñas deben de ser iguales"
                });
            } else {
                const result = await signUpApi(inputs);
                if (!result.ok) {
                    notification["error"]({
                        message: result.message
                    })
                } else {
                    notification["success"]({
                        message: result.message
                    });
                    resetFrom();

                }
            }
        }
    }
    const resetFrom = () => {
        const inputs = document.getElementsByTagName("input");

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");
        }
        setinputs({
            email: "",
            password: "",
            repeatPassword: "",
            privacyPolicy: false
        });

        setFormValid({
            email: false,
            password: false,
            repeatPassword: false,
            privacyPolicy: false
        });
    };

    return (
        <Form className="register-form" onFinish={register} onChange={changeForm}>
            <Form.Item>
                <Input
                    prefix={<FontAwesomeIcon icon={faAt} />}
                    type="email"
                    name="email"
                    placeholder="Correo electronico"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.email}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<FontAwesomeIcon className="iconoo" icon={faLock} />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.password}


                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<FontAwesomeIcon icon={faLock} />}
                    type="password"
                    name="repeatPassword"
                    placeholder="Repetir Contraseña"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.repeatPassword}
                />
            </Form.Item>
            <Form.Item>
                <Checkbox
                    name="privacyPolicy"
                    onChange={inputValidation}
                    checked={inputs.privacyPolicy}>
                    He leído y acepto la polícica de privacidad
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="register-form__button">
                    Crear Cuenta
                </Button>
            </Form.Item>

        </Form>
    );
}
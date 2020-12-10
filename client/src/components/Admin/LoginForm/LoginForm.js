import React, {useState} from "react";
import { Form, Input, Button, notification } from "antd";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import { singInApi } from "../../../api/user";
import "./LoginForm.scss";
export default function LoginFrom() {

    const [ inputs, setInputs ] = useState({
        email: "",
        password: "",
    });

    const changeForm = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    };

    const login = async () => {
      const result = await singInApi(inputs);

      if(result.message){
        notification["error"]({
            message: result.message
        })
      }else{
          const { accessToken, refreshToken } = result;
          localStorage.setItem(ACCESS_TOKEN, accessToken);
          localStorage.setItem(REFRESH_TOKEN, refreshToken);

          notification["success"]({
              message: "Login Correcto"
          });

          window.location.href = "/admin";
      }
      console.log(result);

    }

    return (
        <Form className="login-form" onChange={changeForm} onFinish={login}>
            <Form.Item>
                <Input
                    prefix={<FontAwesomeIcon icon={faAt} />}
                    type="email"
                    name="email"
                    placeholder="Correo electronico"
                    className="login-form__input"
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<FontAwesomeIcon className="iconoo" icon={faLock} />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="login-form__input"
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="login-form__button">Entrar</Button>
            </Form.Item>
        </Form>
    );
}
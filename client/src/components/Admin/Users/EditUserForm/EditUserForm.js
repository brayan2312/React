import React, {useState, useEffect, useCallback} from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Form, Input, Select, Button, Row, Col } from "antd";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import "./EditUserForm.scss";

export default function EditUserForm(props){
    const { user } = props;
    // console.log(user);
    const [avatar, setAvatar] = useState(null);

    const [userData, setUserData] = useState({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        avatar: user.avatar

    });
    useEffect( () => {
        if(avatar){
            setUserData({ ...userData, avatar});
        }
    },[avatar]);
    const updateUser = e => {
        console.log(userData);
    }

    return (
        <div className="edit-users-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <EditForm user={user} userData={userData} setUserData={setUserData} updateUser={updateUser} />
        </div>
    );
}

function UploadAvatar(props){
    const { avatar, setAvatar } = props;

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file)});
        },
        [setAvatar]
    );

    const {getRootProps, getInputProps, isDragActive}  = useDropzone({
        accept:"image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar} />
            ) : (
                <Avatar size={150} src={avatar ? avatar.preview : NoAvatar} />
            )}
        </div>
    );
}

function EditForm(props){
    const { user, userData, setUserData, updateUser } = props;
    const { Option } = Select
    console.log(user);
    return (
        <Form className="form-edit" onFinish={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<FontAwesomeIcon icon={faUser} />}
                            placeholder="Nombre"
                            defaultValue={user.name}
                            onChange={ e => setUserData({ ...userData, name: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<FontAwesomeIcon icon={faUser} />}
                            placeholder="Apellidos"
                            defaultValue={userData.lastname}
                            onChange={ e => setUserData({ ...userData, lastname: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<FontAwesomeIcon icon={faAt} />}
                            placeholder="Correo"
                            defaultValue={userData.email}
                            onChange={e => setUserData({ ...userData, email: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Seleccionar un rol"
                            onChange={e => setUserData({... userData, role: e})}
                            defaultValue={userData.role}
                        >
                            <Option value="admin">Administrador</Option>
                            <Option value="editor">Editor</Option>
                            <Option value="revisor">Revisor</Option>

                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<FontAwesomeIcon icon={faLock} />}
                            type="password"
                            placeholder="Contraseña"
                            onChange={ e => 
                                setUserData({ ...userData, password: e.target.value})
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                        <Input 
                            prefix={<FontAwesomeIcon icon={faLock} />}
                            type="password"
                            placeholder="Contraseña"
                            onChange={ e => 
                                setUserData({ ...userData, repeatPassword: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Usuario
                </Button>
            </Form.Item>
        </Form>
    );
}
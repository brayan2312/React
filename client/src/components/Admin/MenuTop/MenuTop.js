import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { MenuUnfoldOutlined as IMenu1, MenuFoldOutlined as IMenu2, PoweroffOutlined as Power } from '@ant-design/icons';
import Logo from "../../../assets/img/png/logo-white.png";
import { logout } from "../../../api/auth";
import './MenuTop.scss';

export default function MenuTop(props) {
    const { menuCollapsed, setMenuCollapsed } = props;
    const logoutUser = () => {
        logout();
        window.location.reload();
    }
    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <Link to="/admin">
                    <img
                        className="menu-top__left-logo"
                        src={Logo}
                        alt="Brayan Nava"
                    />
                </Link>

                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                    {menuCollapsed ? <IMenu2 /> : <IMenu1 />}

                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={logoutUser}>
                    <Power />
                </Button>

            </div>
        </div>
    );
}
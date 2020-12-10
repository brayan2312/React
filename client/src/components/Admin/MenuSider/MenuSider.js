import React from "react";
import {Link, withRouter} from "react-router-dom";
import { Layout, Menu} from "antd";
import { HomeOutlined   as IHome, MenuOutlined as IMenu, UserOutlined as IUsers} from '@ant-design/icons';
import "./MenuSider.scss";


 function MenuSider(props){
    const { Sider } = Layout;
    const { menuCollapsed, location } = props;

    return (
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key="/admin">
                    <Link to={"/admin"}>
                        <IHome />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/users">
                    <Link to="/admin/users">
                        <IUsers />
                        <span className="nac-text">Usuarios</span>
                        
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
export default withRouter(MenuSider);
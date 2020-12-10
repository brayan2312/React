import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import useAuth from "../hooks/useAuth";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdmimSignIn from "../pages/Admin/SingnIn";
import { getAccessToken, getRefreshToken } from "../api/auth";
import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { Header, Content, Footer } = Layout;

    const { user, isLoading } = useAuth();

    if (!user && !isLoading) {
        return (
            <>
                <Route path="/admin/login" component={AdmimSignIn} />
                <Redirect to="/admin/login" />
            </>
        );
    }

    if(user && !isLoading){
        return (
            <Layout>
                <MenuSider menuCollapsed={menuCollapsed} />
    
                <Layout className="layout-admin" style={{ marginLeft: menuCollapsed ? "70px" : "190px" }}>
                    <Header className="layout-admin__header">
                        <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
                    </Header>
                    <Content className="layout-admin__content">
                        <LoadRouters routes={routes} />
                    </Content>
                    <Footer className="layout-admin__footer">Brayan Fernando Antunez Nava</Footer>
                </Layout>
    
            </Layout>
        );
    }

    return null;
    
}

function LoadRouters({ routes }) {
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
        </Switch>
    );
}
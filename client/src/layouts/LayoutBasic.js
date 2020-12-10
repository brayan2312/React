import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import "./LayoutAdmin.scss";
export default function LayoutBasic(props){
    const { routes } = props;
    const { Header, Content, Footer } = Layout;

    return (
        <Layout>
            <h2>Menu Sider Basic user</h2>
           <Layout>
               <Content>
                  <LoadRoutes routes={routes} />
               </Content>
               <Footer>Brayan Fernando Antunez Nava</Footer>
           </Layout>
        </Layout>
    );
}
function LoadRoutes({routes}){
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
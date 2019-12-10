import React, {useEffect} from 'react';
import {Cookies} from 'react-cookie';
import {Button, Icon, Layout, Menu,} from 'antd';
import {Link, useHistory, withRouter} from 'react-router-dom';

const {SubMenu} = Menu;
const cookies = new Cookies();

const {Header, Footer, Sider, Content} = Layout;

const UpdateTutor = () => {
    const curr_user = cookies.get('CURR_USER');
    const history = useHistory();
    useEffect(() => {
        console.log(curr_user);
        if (curr_user.type === 2) {
            history.push('/');
        }
    });

    return (
        <Layout style={{display: 'flex', flexDirection: 'column'}}>
            <Header style={{background: '#fff', padding: 0}}>
                <Link to="/">
                    <Button className="btn-homepage"
                            type="primary"
                            size="large">
                        HomePage
                    </Button>
                </Link>
                <Link to="/login">
                    <Button className="btn-signin"
                            type="primary"
                            size="large"
                            style={{float: 'right', marginRight: '15px'}}
                            onClick={async () => {
                                await cookies.set('CURR_USER', '');
                            }}>
                        Logout
                    </Button>
                </Link>
            </Header>
            <div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
                <div style={{background: '#001529'}}>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={broken => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Icon type="user"/>
                                <span className="nav-text">Personal Info</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="history"/>
                                <span className="nav-text">Teaching History</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="message"/>
                                <span className="nav-text">Conversation</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                </div>
                <>
                    <Content style={{margin: '24px 16px 0'}}>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>content</div>
                    </Content>
                </>
            </div>
            <Footer style={{textAlign: 'center', padding: '12px 50px'}}>
                &copy; Copyright - HCMUS-2019
            </Footer>
        </Layout>
    );
}

export default withRouter(UpdateTutor);

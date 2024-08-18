import React, { useState, useEffect } from "react";
import { TeamOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import PlayerAdd from "./Player/PlayerAdd";
import CoachAdd from "./Coach/CoachAdd";
import Lineup from "./LineUp/LineUp";
import DataTeamAdmin from "./Player/DataTeamAdmin";
import {useSelector} from "react-redux";
//import SavedLineups from './LineUp/SaveLineUp';
import DataCoachAdmin from "./Coach/DataCoachAdmin";
const { Header, Content, Sider } = Layout;

const items2 = [
  {
    key: "sub1",
    icon: <TeamOutlined />,
    label: "Quản lý đội bóng",
    children: [
      {
        key: "2",
        label: "Cầu thủ",
        children: [
          { key: "2.1", label: "Thêm cầu thủ" },
          { key: "2.2", label: "Sửa cầu thủ" },
        ]
      },
      { key: "3", label: "Huấn luyện viên",
        children :[
            {key: "3.1", label: "Thêm huấn luyện viên"},
            {key: "3.2", label: "Sửa huấn luyện viên"}
        ]
      },
      { key: "4", label: "Đội hình"},
      { key: "5", label: "Lưu đội hình"}
    ],
  },
];

const ManagerDashboard = () => {
  const [user, setUser] = useState(null);
  const [savedLineups, setSavedLineups] = useState([]);
  const accessToken = useSelector((state) => state.user.accessToken);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8888/profile', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const profileData = await response.json();
        setUser(profileData.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchProfile().then(r => console.log(r));
  }, [accessToken]);

  const items1 = user ? [{ key: "1", label: `Quản trị của câu lạc bộ ${user.clubName}` }] : [];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedMenuKey, setSelectedMenuKey] = useState(
    items2[0].children[0].key
  );

  const handleMenuClick = ({ key }) => {
    setSelectedMenuKey(key);
  };

  const renderContent = () => {
    switch (selectedMenuKey) {
      case "2.1":
        return <PlayerAdd  />
      case "2.2":
        return <DataTeamAdmin />;
      case "3.1":
        return <CoachAdd />;
      case "3.2":
        return <DataCoachAdmin />;
      case "4":
        return <Lineup setSavedLineups={setSavedLineups} />;
      // case "5":
      //   return <SavedLineups savedLineups={savedLineups} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Manager</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ManagerDashboard;
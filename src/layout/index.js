import React from 'react';
import { Layout } from 'antd';

const { Content, Sider } = Layout;

const TwoColumn = props => (
  <Content>
    <Layout style={{ background: "#FFFFFF" }}>
      <Sider
        width={280}
        style={{
          background: "#FFFFFF",
          borderRight: "1px solid #EEEEEE",
          paddingRight: "30px"
        }}
      >
        {props.side}
      </Sider>
      <Content style={{ padding: "0 0 0 30px", minHeight: 400 }}>
        {props.content}
      </Content>

    </Layout>
  </Content >
);

export { TwoColumn };
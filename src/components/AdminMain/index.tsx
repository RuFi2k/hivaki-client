import React from 'react';
import { Tabs, Tab  } from '@material-ui/core';
import './style.css';
import * as TabsContent from './tabs';

const sections = [
  <TabsContent.Account />,
  <TabsContent.Slots />,
  <TabsContent.Bookings />,
]

const Component: React.FC = () => {

  const [tab, setTab] = React.useState<number>(0)
  return <section className='admin-section'>
    <Tabs
        orientation="vertical"
        value={tab}
        onChange={(e: React.ChangeEvent<{}>, newValue: number) => setTab(newValue)}
        aria-label="Vertical tabs"
      >
        <Tab label="Аккаунт" />
        <Tab label="Слоты" />
        <Tab label="Записи" />
      </Tabs>
      <div className="admin-tabcontent">
        {sections[tab]}
      </div>
  </section>;
}

export default Component;

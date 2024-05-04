import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Container } from '@mui/material';
import { IconBlob, IconMailQuestion, IconPackage, IconQuestionMark, IconUsb, IconUser, IconUserCircle } from '@tabler/icons-react';
import { Category, MedicalInformation, PostAdd } from '@mui/icons-material';
import PackagesTab from './tabs/PackagesTab';
import CategoriesTab from './tabs/CategoriesTab';
import { InquiriesTab } from './tabs/InquiriesTab';
import { BlogsTab } from './tabs/BlogsTab';

const Dashboard: React.FC = () => {
    const [value, setValue] = useState(4);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const tabs = [
        <Tab sx={{ textTransform: 'none', padding: 0, marginX: 1 }} component="h1" icon={
            <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 1 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                <Category />
                <span className='mx-2 mt-1'>Categories</span>
            </div>
        } className='flex flex-row flex-1' />,
        <Tab sx={{ textTransform: 'none', padding: 0, marginX: 1 }} component="h1" icon={
            <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 2 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                <IconPackage />
                <span className='mx-2 mt-1'>Packages</span>
            </div>
        } className='flex flex-row flex-1' />,
        <Tab sx={{ textTransform: 'none', padding: 0, marginX: 1 }} component="h1" icon={
            <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 3 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                <IconMailQuestion />
                <span className='mx-2 mt-1'>Inquiries</span>
            </div>
        } className='flex flex-row flex-1' />,
        <Tab sx={{ textTransform: 'none', padding: 0, marginX: 1 }} component="h1" icon={
            <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 4 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                <PostAdd />
                <span className='mx-2 mt-1'>Blogs</span>
            </div>
        } className='flex flex-row flex-1' />


    ]
    const panels = [
        <TabPanel value={value}  index={1}>
            <CategoriesTab/>
        </TabPanel>,
            <TabPanel value={value}  index={2}>
            <PackagesTab/>
        </TabPanel>,
        <TabPanel value={value}  index={3}>
            <InquiriesTab/>
        </TabPanel>,
        <TabPanel value={value}  index={4}>
           <BlogsTab/>
       </TabPanel>
    ]


    return (
        <div style={{ display: 'flex' }} >
            <Tabs
                
                orientation="vertical"
                value={value}
                onChange={handleChange}
                className='flex-1/2 shadow-xl'
                
                style={{ borderRight: '1px solid #e0e0e0',backgroundColor:'black',height:window.innerHeight }}
            >

                <div className='w-64 h-72 flex items-center flex-center flex-col'>
                    <IconUserCircle size={'170px'} stroke={1} className='mt-10 rounded-full self-center text-yellow-500  w-full'  />
                    <span className='w-full text-white font-bold text-[18px] text-center'>Admin Dashboard</span>
                </div>

                {...tabs}


            </Tabs>
            <div className='flex-1 '>
                {
                    ...panels
                }
            </div>
        </div>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            
            aria-labelledby={`tab-${index}`}
            style={{ width: '100%' }}
        >
            {value === index && <Box p={0}>{children}</Box>}
        </div>
    );
};

export default Dashboard;

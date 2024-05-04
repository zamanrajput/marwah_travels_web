'use client'
import { Grid, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import CallIcon from '@mui/icons-material/Call';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { IconBuildingArch, IconMail, IconMessage2, IconPhone, IconUser } from '@tabler/icons-react';
import CustomFormLabel from './theme-elements/CustomFormLabel';
import CustomOutlinedInput from './theme-elements/CustomOutlinedInput';
import Button from './Button';
import { DateRangeSharp } from '@mui/icons-material';
import dayjs from 'dayjs';
import CustomTextField from './theme-elements/CustomTextField';
import CustomTextFieldComponent from './cTF';
import { transparentBlack } from '@/constants';

const CustomPackageForm = () => {
  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Layout */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <Grid container spacing={2}>
        {/* 1 */}
        <Grid item xs={12} sm={12}>
          <span  className='bold-54 text-white font-bold text-3xl'>
            Create Custom Package
          </span>
        </Grid>

        <Grid item  sm={8}>
          <CustomTextFieldComponent   label='Package Name'  textColor='white' backgroundColor={transparentBlack} hintColor='white'/>
        </Grid>
        <Grid item sm={4}>
          <CustomTextFieldComponent  label='Tour Days'  textColor='white' backgroundColor={transparentBlack} hintColor='white'/>
        </Grid>
        <Grid item  sm={4}>
          <CustomTextFieldComponent  label='Flight From (Airport Name)'  textColor='white' backgroundColor={transparentBlack} hintColor='white'/>
        </Grid>
        <Grid item  sm={4}>
          <CustomTextFieldComponent  label='Your Country'  textColor='white' backgroundColor={transparentBlack} hintColor='white'/>
        </Grid>
        <Grid item  sm={4}>
          <CustomTextFieldComponent  label='Your City'  textColor='white' backgroundColor={transparentBlack} hintColor='white'/>
        </Grid>
        <Grid item  sm={4}>
          <CustomTextFieldComponent  label='Number Of Travelers'  textColor='white' backgroundColor={transparentBlack} hintColor='white'/>
        </Grid>
        <Grid item  sm={4}>
          <CustomTextFieldComponent  label='Number Of Nights (In Makkah)'  textColor='white' backgroundColor={transparentBlack} hintColor='white'/>
        </Grid>
        <Grid item  sm={4}>
          <CustomTextFieldComponent  label='Number Of Nights (In Madinah)'  textColor='white' backgroundColor={transparentBlack} hintColor='white'/>
        </Grid>
    

        <Grid item xs={12} sm={6}>
          <CustomTextFieldComponent  label='Your Phone'  textColor='white' backgroundColor={transparentBlack} hintColor='white'/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextFieldComponent  label='Your Email'  textColor='white' backgroundColor={transparentBlack} hintColor='white'/>
        </Grid>
        <Grid item xs={12} sm={12}>
          <CustomTextFieldComponent  label='Additional Comments'  textColor='white' backgroundColor={transparentBlack} hintColor='white'/>
        </Grid>



      
     
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={12}>
          <Button
            type="button"

            title='Get Best Prices'
            variant="btn_blue" onClick={undefined}          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomPackageForm;

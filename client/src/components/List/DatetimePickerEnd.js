import { useState, useEffect } from 'react';
import './DateTimePicker.css';
import dayjs from 'dayjs';
import "dayjs/locale/fr";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { frFR } from '@mui/x-date-pickers';

export default function BasicDateTimePicker({ label, handleDateEndChange, name, dateTimeStart }) {
    const [value, setValue] = useState(dayjs(Date.now()));
    const subValue = Object.values(value);
    const dateFromValue = subValue[2].toString();
    const troncate = dateFromValue.split(' ');
    const dateStr = troncate[0] + ' ' + troncate[1] + ' ' + troncate[2] + ' ' + troncate[3] + ' ' + troncate[4] + ' ' + troncate[5];
    const timestamp = Date.parse(dateStr);

    const minDateTime = dayjs(dateTimeStart);

    useEffect(() => {
        handleDateEndChange(timestamp);
    }, [value])

    return (
        <>
            {
                dateTimeStart ? (
                    < LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="fr"
                        localeText={frFR.components.MuiLocalizationProvider.defaultProps.localeText} >
                        <DesktopDateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label={label}
                            minDateTime={minDateTime}
                            value={value}
                            disablePast
                            name={name}
                            onChange={(newValue) => {
                                setValue(newValue);
                                handleDateEndChange(timestamp);
                            }}
                        />
                    </LocalizationProvider >
                )
                    : (
                        < LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale="fr"
                            localeText={frFR.components.MuiLocalizationProvider.defaultProps.localeText} >
                            <DesktopDateTimePicker
                                disabled
                                renderInput={(props) => <TextField {...props} />}
                                label={label}
                                value={value}
                                name={name}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                    handleDateEndChange(timestamp);
                                }}
                            />
                        </LocalizationProvider >
                    )
            }
        </>
    );
}
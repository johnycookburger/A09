'use client'
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

export default function DateReserve() {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    
    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-[65%] bg-white"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ffa500',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ffa500',
                        },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#ffa500',
                    },
                    '& .MuiPickersDay-root.Mui-selected': {
                        backgroundColor: '#ffa500',
                    },
                }}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        variant: "outlined",
                    },
                }}
                disablePast
            />
        </LocalizationProvider>
    );
}
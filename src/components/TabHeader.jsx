import React from "react";
import { Box, Tab, Tabs} from "@mui/material";



export const TabHeader = (props) => {

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

    const handleChange = (event, newValue) => {
        props.setValue(newValue);
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={props.value} onChange={handleChange} aria-label="basic tabs example">
                    {props.items.map((item, idx) => {
                            return(
                                <Tab label={item} {...a11yProps(idx)} />
                            )   
                        })
                    }
                </Tabs>
        </Box>
    );
}
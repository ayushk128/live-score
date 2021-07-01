import { Tabs } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Tab } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { getCricketMatches } from '../services/cricket-api';
import Score from './Score';

function TabComponent() {

    const [value, setValue] = useState(0);
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        getCricketMatches().then(data => {
            setMatches(data.matches);
            console.log(data.matches);
        }).catch(error => console.log(error));
    }, []);

    const handleChange = (e, value) => {
        setValue(value);
    }

    function TabPanel(props) {
        return (
            <Box>
                {props.value === props.index && (
                    <Box>
                        <Typography> {props.children} </Typography>
                    </Box>
                )}
            </Box>
        )
    }

    function getData(type) {
        return (
            matches.map(match => {
                return (
                    <>
                        {match.type === type ?
                            <Box display = "flex" alignItems = "center" justifyContent = "center">
                                <Score match={match} key={match.unique_key} />
                            </Box>
                            : ""}
                    </>
                )
            })
        )
    }
    return (
        <>
            <Tabs value={value} onChange={handleChange} indicatorColor='primary'>
                <Tab label="One Day" />
                <Tab label="Twenty 20" />
                <Tab label="Test" />
            </Tabs>

            <TabPanel index={0} value={value}>
                {getData("")}
            </TabPanel>

            <TabPanel index={1} value={value}>
                {getData("Twenty20")}
            </TabPanel>

            <TabPanel index={2} value={value}>
                {getData("Tests")}
            </TabPanel>
        </>
    );
}

export default TabComponent;
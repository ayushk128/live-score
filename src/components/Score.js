import React from 'react';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import icon from '../images/icon.jpg'
import { withStyles } from '@material-ui/styles';
import { getCricketMatchDetails } from '../services/cricket-api';

const styles = {
    date: {
        alignitems: 'flex-start'
    },
    matchDetails: {
        marginLeft: 'auto'
    },
    component: {
        background: "#3f51b5",
        color: 'white',
        display: 'flex',
        alignitems: 'flex-start',
        padding: '10px'
    }
}

class Score extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {}
        }
    }
    getDetails(id) {
        getCricketMatchDetails(id).then(data => {
            this.setState({ detail: this.state.detail = data });
            console.log(data);
        }).catch(error => console.log(error));
    }

    getScore = (score) => {
        if (!score) return {};
        let numb = score && score.split('/');
        let nummid = numb && numb[1] && numb[1].split('v');
        let ans = {};
        ans.first = numb && nummid && numb[0] && nummid[0] && numb[0].replace(/[^0-9]/g, '') + '/' + nummid[0].replace(/[^0-9]/g, '');
        ans.second = numb && nummid && numb[2] && nummid[1] && nummid[1].replace(/[^0-9]/g, '') + '/' + numb[2].replace(/[^0-9]/g, '');
        console.log(ans.first + '   ' + ans.second);
        return ans;
    }
    render() {
        let score = this.getScore(this.state.detail.score)
        return (
            <Card style={{ margin: 20, width: 900 }}>
                <Box className={this.props.classes.component}>
                    <Typography>{this.props.match["team-1"]} V/S {this.props.match["team-2"]}</Typography>
                    <Button onClick={() => this.getDetails(this.props.match.unique_id)} variant="contained" size="small" color="primary" style={{ marginLeft: "auto", border: "1px solid #ffff" }} disabled={this.props.match.matchStarted === false}>Get Score</Button>
                </Box>
                <CardContent>
                    <Box style={{ display: 'flex' }}>
                        <Typography className={this.props.classes.date}> {new Date(this.props.match.dateTimeGMT).toLocaleDateString()} </Typography>
                        <Typography className={this.props.classes.matchDetails}>{this.props.match.matchStarted ? "Match is running" : "Match has not yet started"} </Typography>
                    </Box>
                    <Grid container justify="center" alignitems="center">
                        <Grid>
                            <Typography variant="h5">{this.props.match['team-1']}</Typography>
                            <Typography>{score.first}</Typography>
                        </Grid>
                        <Grid>
                            <img style={{ width: 100, height: 100 }} src={icon} alt="v/s" />
                        </Grid>
                        <Grid>
                            <Typography variant="h5">{this.props.match['team-2']}</Typography>
                            <Typography>{score.second}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid container justify="center" style={{ display: 'block' }}>
                        <Typography>{this.state.detail.score}</Typography>
                        <Typography>Limited Person</Typography>
                    </Grid>
                </CardActions>
            </Card>

        )
    }
}

export default withStyles(styles)(Score);
import React, { useState } from 'react';
import classnames from 'classnames';
//MATERIAL-UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//ROUTER-DOM
import { useHistory } from 'react-router-dom';
//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';
import { selectUser } from '../../toolkit/userSlice';
import { storeHisuserid } from '../../toolkit/hisuseridSlice';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        }
    })
)

function List() {
    const classes = useStyles();
    const [ expanded, setExpanded ] = useState<string | false>(false);
    const screen700 = useMediaQuery('(max-width:700px)');

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    }

    const dark = useSelector(selectDark);
    const themeA = createMuiTheme({
        //for accordion only
        palette: {
            type: dark ? "dark" : "light",
            background: {     //black     //white
                paper: dark ? "#424242" : "#d3d3d3"
            }
        }
    })
    const themeB = createMuiTheme({
        //for accordion only
        palette: {
            type: dark ? "dark" : "light",
            background: {      //white    //black
                paper: dark ? "#d3d3d3" : "#424242"
            }
        }
    })

    const users = useSelector(selectUser);
    const dispatch = useDispatch();

    const history = useHistory();
    
    if(users[users?.length-1] === []) {
        return <div> Loading. . . </div>
    }
    else {
        return (
            <>
                {
                    (users[users?.length-1]?.length !== 1)
                    ? (
                        <ThemeProvider theme={themeA}>
                            <div
                                className={classnames(classes.root, "ifnotempty")}
                                id={!dark ? "darkRespectAll" : "lightRespectAll"}
                            >
                            {
                                users[users?.length-1]?.map((item) => {
                                    if(item.id === 0) {    //bcz starts from 1
                                        return null;
                                    }
    
                                    return (
                                        <Accordion expanded={expanded === `panel${item.id}`} onChange={handleChange(`panel${item.id}`)} key={item.id} square>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls={`panel${item.id}bh-content`}
                                                id={`panel${item.id}bh-header`}
                                        >
                                                <Typography className={classes.heading} id="id"> {item.id}. </Typography>
                                                <Typography className={classes.secondaryHeading} id="username"> {item.username} </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails id="details">
                                                <table className="table table-hover table-dark table-sm">
                                                    <tbody>
                                                        <tr>
                                                            <th> Id </th> <td> {item.id} </td>
                                                        </tr>
                                                        <tr>
                                                            <th> Name </th> <td> {item.username} </td>
                                                        </tr>
                                                        <tr>
                                                            <th> Email </th> <td> {item.email} </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </AccordionDetails>
                                            <div className="styled">
                                                <ThemeProvider theme={themeB}>
                                                    <Button disableRipple onClick={() => { history.push('/hispublicdiaries'); dispatch(storeHisuserid(item.id)) }} style={{ width: "7rem" }} size={screen700 ? "small" : "medium"}>
                                                        PUBLIC DIARIES
                                                    </Button>
                                                </ThemeProvider>
                                            </div>
                                        </Accordion>
                                    )
                                })
                            }
                            </div>
                        </ThemeProvider>
                    ) : (
                        <div
                            className="ifempty"
                            id={!dark ? "darkRespectAll" : "lightRespectAll"}
                        >
                            <Typography component="p"> no users. . :'( </Typography>
                        </div>
                    )
                }
            </>
        )    
    }
}

export default List;
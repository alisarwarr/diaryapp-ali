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
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';
import { selectDiary } from '../../toolkit/diarySlice';
import { selectUser } from '../../toolkit/userSlice';
import { selectUserid } from '../../toolkit/useridSlice';
//FOR EDIT DIARY
import EditDiary from '../EditDiary';
//FOR READ DIARY
import ReadDiary from '../ReadDiary';

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

const truncate = (str: string, n: number) => str?.length > n ? `${str.substr(0, n-1)} ...` : str;

function List() {
    const classes = useStyles();
    const [ expanded, setExpanded ] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    }

    const dark = useSelector(selectDark);
    const theme = createMuiTheme({
        //for accordion only
        palette: {
            type: dark ? "dark" : "light",
            background: {     //black     //white
                paper: dark ? "#424242" : "#d3d3d3"
            }
        }
    })

    const users = useSelector(selectUser);
    let eachMatchedBooleans = users[users.length-1].map(item => item.matched);   //grap each 'matched' from all objects in form of an array
    let ifAnyMatchedTrue = eachMatchedBooleans?.includes(true);                  //if any index have that value returns true otherwise false    

    const diaries = useSelector(selectDiary);
    const userid = useSelector(selectUserid);

    if (diaries[diaries?.length-1] === []) {
        return <div> Loading. . . </div>
    }
    else {
        let no:number = 0;

        return (
            <>
                {
                    (diaries[diaries?.length-1]?.length !== 1)
                    ? (
                        <ThemeProvider theme={theme}>
                            <div
                                className={classnames(classes.root, "ifnotempty")}
                                id={!dark ? "darkRespectAll" : "lightRespectAll"}
                            >
                                {
                                    diaries[diaries?.length-1]?.map((item) => {
                                        if(
                                            item.privacy === 'public'       //* if public then show
                                            ||                              //* OR
                                            (
                                                item.privacy === 'private'  //* when private
                                                &&
                                                item.userId === userid      //* also user's id match
                                                &&
                                                ifAnyMatchedTrue            //* also user is signedin
                                            ) 
                                        ) {
                                            if(item.id === 0) {    //bcz starts from 1
                                                return null;
                                            }
                                            ++no;
    
                                            return (
                                                <Accordion expanded={expanded === `panel${no}`} onChange={handleChange(`panel${no}`)} key={no} square>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls={`panel${no}bh-content`}
                                                        id={`panel${no}bh-header`}
                                                    >
                                                        <Typography className={classes.heading} id="id"> {no}. </Typography>
                                                        <Typography className={classes.secondaryHeading} id="username"> {item.title} </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails id="details">
                                                        <table className="table table-hover table-dark table-sm">
                                                            <tbody>
                                                                <tr>
                                                                    <th> Id </th> <td> {no} </td>
                                                                </tr>
                                                                <tr>
                                                                    <th> UserId </th> <td> {item.userId} </td>
                                                                </tr>
                                                                <tr>
                                                                    <th> Title </th> <td> {item.title} </td>
                                                                </tr>
                                                                <tr>
                                                                    <th> Privacy </th> <td> {item.privacy} </td>
                                                                </tr>
                                                                <tr>
                                                                    <th> Notes </th> <td> {truncate(item.notes, 50)} </td>
                                                                </tr>
                                                                <tr>
                                                                    <th> Created Date </th> <td> {item.createdDate} </td>
                                                                </tr>
                                                                <tr>
                                                                    <th> Created Time </th> <td> {item.createdTime} </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <div id={!dark ? "darkRespectAll" : "lightRespectAll"}>
                                                            {
                                                                ifAnyMatchedTrue && (
                                                                    <EditDiary   /*button*/
                                                                        id={item.id}
                                                                        title={item.title}
                                                                        privacy={item.privacy}
                                                                        notes={item.notes}
                                                                    />
                                                                )
                                                            }
                                                            <ReadDiary   /*button*/
                                                                title={item.title}
                                                                notes={item.notes}
                                                            />
                                                         </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            )    
                                        }
                                        else {
                                            return null;
                                        }
                                    })
                                }
                            </div>
                        </ThemeProvider>
                    ) : (
                        <div
                            className="ifempty"
                            id={!dark ? "darkRespectAll" : "lightRespectAll"}
                        >
                            <Typography component="p"> no diaries. . :'( </Typography>
                        </div>
                    )
                }
            </>
        )
    }
}

export default List;
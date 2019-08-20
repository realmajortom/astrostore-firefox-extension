/*global chrome*/
import React, {useState, useEffect} from 'react';
import axios from 'axios/index';
import {makeStyles} from '@material-ui/styles/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import {Dropdown, TextField} from './inputs/MaterialInputs';
import ChunkyButton from './inputs/ChunkyButton';

const useStyles = makeStyles({
    root: {
        fontFamily: ['"Lato"', 'sans-serif'],
        fontSize: 13,
        borderBottom: '1px solid #eeeeee',
        paddingTop: 0,
        paddingBottom: 0,
        minHeight: 42,
        '&:hover': {
            color: '#7e17ea',
            background: 'transparent'
        }
    }
});


function AddBookmark(props) {
    const classes = useStyles();
    const token = localStorage.getItem('JWT');
    const [dropItems, setDropItems] = useState([]);

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');
    const [parentId, setParent] = useState('');


    useEffect(() => {
        axios.get('https://astrostore.io/api/collection/all', {
            headers: {Authorization: `JWT ${token}`}
        }).then(res =>
            setDropItems(res.data.sort((a,b) => a.sequence - b.sequence))
        );
    }, [token]);

    useEffect(() => {
        chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
            setTitle(tabs[0].title);
        })
    }, []);

    useEffect(() => {
        chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
            setUrl(tabs[0].url);
        })
    }, []);


    const addBookmark = () => {
        axios.post('https://astrostore.io/api/bookmark/create',
            {title: title, url: url, parentId: parentId},
            {headers: {Authorization: `JWT ${token}`}}
        ).then(res =>
                res.data.success
                    ? setMessage('Success!')
                    : setMessage('Error Adding Bookmark :(')
        )
    };

    const logout = () => {
        localStorage.removeItem('JWT');
        setTimeout(() => props.update(), 10);
    };

    return (
        <div className='container'>

            <div className='modalHeader'>New Bookmark</div>
            <div className='modalMessage'>{message}</div>

            <div className='fieldWrapper'>

                <TextField
                    label='Bookmark Title'
                    placeholder=''
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label='Bookmark Url'
                    placeholder=''
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Dropdown
                    label='Collection'
                    value={parentId}
                    onChange={(e) => setParent(e.target.value)}
                >
                    {
                        dropItems.map(c =>
                            <MenuItem value={c._id} key={c._id} className={classes.root} >
                                {c.title}
                            </MenuItem>
                        )
                    }
                </Dropdown>

            </div>

            <div className='submitWrapper'>
                <ChunkyButton
                    onPress={() => addBookmark()}
                    text={'Submit'}
                    type={'primary'}
                />
            </div>

            <div onClick={() => logout()} className='logOut'>Log Out</div>
        </div>
    );
}


export default AddBookmark;
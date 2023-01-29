import React from 'react'
import twitterIcon from '../../img/icons/twitter-icon.png'
import './LogoSearch.css'
import SearchIcon from '@material-ui/icons/Search';
import Twitter from '@material-ui/icons/Twitter'

const LogoSearch = () => {
  return (
    <div className='LogoSearch'>
        <Twitter className='twitterIcon' style={{fontSize: '45px'}}/>
        <div className='searchBar'>
            <input type='text' placeholder= 'Explore' ></input>
            <div className='searchIcon'> 
                <SearchIcon style={{fontSize: '35px'}}/>
            </div>
        </div>
    </div>
  ) 
}

export default LogoSearch
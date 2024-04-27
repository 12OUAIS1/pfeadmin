import React from 'react'
import"./featured.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "react-circular-progressbar/dist/styles.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const Featured = () => {
  return (
    <div className='featured'>
    <div className="top">
<h1 className="title">Total revenue</h1>
<MoreVertIcon fontSize='small'/>
    </div>
    <div className="bottom">
      <div className="fcharts">
       <CircularProgressbar value={10} text={"10%"}/>

      </div>
      <p className="title">total sales made today</p>
      <p className="amount">12000 Da</p>
      <p className="descreption">Lorem ipsum dolor sit am</p>
    <div className="summary">
      <div className="item">
        <div className="itemtitle">target</div>
        <div className="itemrslt negative">
          <KeyboardArrowDownIcon fontSize='small'></KeyboardArrowDownIcon>
          <div className="rsltamount">120000 Da</div>
        </div>
      </div>
      <div className="item">
        <div className="itemtitle">last week</div>
        <div className="itemrslt positive">
          <KeyboardArrowUpIcon fontSize='small'></KeyboardArrowUpIcon>
          <div className="rsltamount">300000 Da</div>
        </div>
      </div>
      <div className="item">
        <div className="itemtitle">last month</div>
        <div className="itemrslt positive">
          <KeyboardArrowUpIcon fontSize='small'></KeyboardArrowUpIcon>
          <div className="rsltamount">1200000 Da</div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Featured

import React from 'react';
import "./widgets.scss";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Widgets = ({ type }) => {
    let data = {}; // Initialize data with an empty object

    const amount = 100;
    const diff = 20;

    switch (type) {
        case "user":
            data = {
                title: "users",
                isMoney: false,
                link: "see all users",
                icon: (<PersonOutlineIcon className='icon'
                style={{
                    color: "crimson",
                    backgroundColor: "rgba(255, 0, 0, 0.2)",}}
                />)
            };
            break;
        case "reclamation":
            data = {
                title: "reclamations",
                isMoney: false,
                link: "see all reclamations",
                icon: (<GppMaybeIcon className='icon'       style={{
                    backgroundColor: "rgba(218, 165, 32, 0.2)",
                    color: "goldenrod",}}/>)
            };
            break;
        case "balance":
            data = {
                title: "balance",
                isMoney: true,
                link: "see balance",
                icon: (<AccountBalanceIcon className='icon'  style={{
                    backgroundColor: "rgba(128, 0, 128, 0.2)",
                    color: "purple",
                  }}/>)
            };
            break;
        case "earnings":
            data = {
                title: "earnings",
                isMoney: true,
                link: "see all earnings",
                icon: (<AttachMoneyIcon className='icon' style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}/>)
            };
            break;
        default:
            break;
    }

    return (
        <div className='widget'>
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"}{amount}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percent">
                    <KeyboardArrowUpIcon/>
                    {diff}%
                </div>
                {data.icon}
            </div>
        </div>
    );
}

export default Widgets;

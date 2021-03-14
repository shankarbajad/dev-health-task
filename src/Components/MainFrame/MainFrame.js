// This component holds the MainFrame screen (header/sidebar/footer)
import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import Sidebar from './Sidebar';
import './MainFrame.css';
import { 
    Menu, 
    Header, 
    Layout, 
    Divider, 
    Dropdown 
} from '@fluentui/react-northstar';
import { 
    OneDriveIcon, 
    AddIcon,
    MoreIcon,
    ShiftActivityIcon
} from '@fluentui/react-icons-northstar';

const inputItems = [
    'Bruce Wayne',
    'Natasha Romanoff',
    'Steven Strange',
    'Alfred Pennyworth',
    `Scarlett O'Hara`,
    'Imperator Furiosa',
    'Bruce Banner',
    'Peter Parker',
    'Selina Kyle',
]

const leftMenuItem = [
    {
      key: 'dashboard',
      content: 'dashboard',
    },
    {
      key: 'settings',
      content: 'settings',
    }
]

const MainFrame = (props) => {

    const [state, setState] = useState({ativeTab: 0})
    
    useEffect(()=>{
        getActiveTab()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const getActiveTab = () => {
        if(props.location.pathname==='/settings'){
            setState({...state, ativeTab: 1})
        }else if(props.location.pathname==='/'){
            setState({...state, ativeTab: 0})
        }
    }

    const handleClickMenu = (e, val) => {
        switch(val.content){
            case 'dashboard' : 
                props.history.push(`/`)
                setState({...state, ativeTab: 0})
            break;
            case 'settings' : 
                props.history.push(`/${val.content}`)
                setState({...state, ativeTab: 1})
            break;
        }
    }
    
    const leftSideContent = () => {
        return(
            <>
                <Header 
                    as="h2"
                >
                    <OneDriveIcon/> Internet
                </Header>
                <Menu 
                    defaultActiveIndex={state.ativeTab} 
                    activeIndex={state.ativeTab}
                    items={leftMenuItem} 
                    underlined 
                    primary 
                    onItemClick={handleClickMenu}
                />
                <AddIcon/>
            </>
        )
    }

    const rightSideContent = () => {
        return(
            <>
                <MoreIcon/>
                <ShiftActivityIcon/>
                <Dropdown
                    items={inputItems}
                    placeholder="Select your hero"
                    checkable
                    getA11ySelectionMessage={{
                        onAdd: item => `${item} has been selected.`,
                    }}
                />
            </>
        )
    }

    return(
        <div className='mainframe'>
            <div className='app-header'/>
            <div className='app-body'>
                <div className='main-header'>
                    <div className='top-header'>
                        <Layout
                            reducing
                            end={rightSideContent()}
                            main={leftSideContent()}
                        />
                        <Divider/>
                    </div>
                </div>
                {props.children}
            </div>
            <Sidebar/>
        </div>
    )
}
export default withRouter(MainFrame);
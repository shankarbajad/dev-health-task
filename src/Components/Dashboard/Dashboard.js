// This component holds the dashboard screen
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ReactMegaMenu from "react-mega-menu";
import './Dashboard.css';

import { 
	Menu, 
	Header,
	menuAsToolbarBehavior 
} from '@fluentui/react-northstar'

const styleConfig = {
    menuProps: {
		style: {
				background: '#e3e3e3',
				height: "20em",
				width: "180px",
				padding: "0",
				margin: "0"
		}
    },
    contentProps: { //right container
		style: {
			width: "80%",
			padding: "2px",
			background: '#fff',
			boxShadow: '0px 0px 1px 1px #e5e5e5',
			borderTop: '4px solid #464775'
		}
    },
    menuItemProps: {
		// style: {
		// 	height: "2em"
		// }
    },
    menuItemSelectedProps: {
		style: {
			background: '#fff',
		}
    },
    containerProps: { //main container
		style: {
			padding: "2px",
			width: '70%',
		}
    }
}

const Dashboard = (props) => {

	const [state, setState] = useState({menuList: [], subMenuList: [], activeMenu: ''})

	useEffect(()=>{
        handleGetMegaMenuList()   
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleGetMegaMenuList = () => {
        var megaMenu = localStorage.getItem('megaMenu');
        if(megaMenu){
            var menuList = JSON.parse(megaMenu);
			menuList.forEach((menu)=>{
				menu['content'] = menu.title;
				menu.subMenuList.forEach((subMenu)=>{
					subMenu['label'] = subMenu.title;
					subMenu['items'] = subMenu.subSubMenuList;
				})
			})

            setState({
                ...state,
                menuList
            })
        }
    }

	const generateData = (subSubMenuList) => {
		var data;
		data = subSubMenuList && subSubMenuList.length ? subSubMenuList.map((subSubMenu)=>{
			return(
				<div className='data-list'>
                    <Header as="h3" style={{margin: 0}} content={subSubMenu.header} />
					<ul>
						{
							subSubMenu.items && subSubMenu.items.map((item)=>{
								return(
									<li><Link to='/' onClick={()=>{console.log('link clicked')}}>{item}</Link></li>
								)
							})
						}
					</ul>
				</div>
			)
		}) : data = <Header as="h2" style={{textAlign: 'center'}} content='No data inserted' />
		return [data]
	}

	const handleClickMenu = (e, value) => {
		var data = state.menuList[value.index].subMenuList;
		if(data && data.length>0){
			data.forEach(async(d)=>{
				<div className='content-body'>
					{d.items = await generateData(d.subSubMenuList)}
				</div>
			})
		}
		setState({
			...state,
			activeMenu: state.activeMenu===value.index+1 ? false : value.index+1,
			subMenuList: data
		})
	}

    return(
        <>
			{
				state.menuList && state.menuList.length>0 &&
				<Menu
					defaultActiveIndex={0}
					items={state.menuList}
					className='menu-header'
					accessibility={menuAsToolbarBehavior}
					aria-label="Compose Editor"
					onItemClick={handleClickMenu}
				/>
			}
			{
				state.activeMenu &&
				<ReactMegaMenu 
					tolerance={50}
					direction={"RIGHT"}
					styleConfig={styleConfig}
					// onExit={()=>{...}}
					data={state.subMenuList}
				/>
			}
        </>
    )
}
export default Dashboard;
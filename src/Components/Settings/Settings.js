// This component holds the setting screen
import React, {useState, useEffect} from 'react';
import { 
    Grid,
    Header,
    Divider,
    Segment,
    Menu,
    Flex,
    Button,
    Input,
    Form,
    FormDropdown,
} from '@fluentui/react-northstar';
import { 
    AddIcon, 
    CloseIcon,
    AcceptIcon
} from '@fluentui/react-icons-northstar';
import './Settings.css';

const items = [
    {
        icon: (
            <AddIcon
            {...{
                outline: true,
            }}
            />
        ),
        key: 'Step 1',
        content: 'Step 1',
    },
    {
        icon: (
            <AddIcon
            {...{
                outline: true,
            }}
            />
        ),
        key: 'Step 2',
        content: 'Step 2',
    },
    {
        icon: (
            <AddIcon
            {...{
                outline: true,
            }}
            />
        ),
        key: 'Step 3',
        content: 'Step 3',
    },
]

const Setting = (props) => {

    const [state, setState] = useState({
        menuList: [], 
        itemList: [],
        activeTab: 'step1',
        selectedMenu: ''
    })

    const handleClickMenu = (e, val) => {
        var activeTab;
        switch(val.content){
            case 'Step 1' : activeTab = 'step1'
            break;
            case 'Step 2' : activeTab = 'step2'
            break;
            case 'Step 3' : activeTab = 'step3'
            break;
        }
        setState({
            ...state,
            activeTab
        })
    }

    const renderTabContentSection = () => {
        if(state.activeTab==='step1'){
            return(
                <>
                    <Button primary onClick={()=>setState({...state, isAddMenu: !state.isAddMenu})}>
                        <AddIcon style={{marginRight: 5}}/> Add Entry
                    </Button>
                    {
                        state.isAddMenu &&
                        <Form style={{flexDirection: 'initial', justifyContent: 'flex-start', marginTop: 15, height: 'auto'}}>
                            <Input 
                                label="Menu" 
                                placeholder='Type in'
                                style={{justifyContent: 'flex-start'}}
                                errorMessage={state.menuNameError && state.menuNameError}
                                onChange={(e)=>setState({...state, menuNameError: false, menuName: e.target.value})}
                                value={state.menuName}
                                required
                            />
                            <Flex gap="gap.smaller" style={{marginTop: 20, marginLeft: 10}}>
                                <Button primary onClick={handleCreateMenu}>
                                    <AddIcon style={{marginRight: 5}}/> Save
                                </Button>
                                <Button seconday onClick={()=>setState({...state, isAddMenu: false, menuName: ''})}>
                                    <CloseIcon style={{marginRight: 5}}/> Cancel
                                </Button>
                            </Flex>
                        </Form>
                    }
                </>
            )
        }else if(state.activeTab==='step2'){
            var menuInputItems = [];
            state.menuList.forEach((menu)=>{
                menuInputItems.push(menu.title)
            })
            return(
                <Form style={{flexDirection: 'initial', justifyContent: 'flex-start', height: 'auto'}}>
                    <Flex gap="gap.smaller">
                        <FormDropdown
                            label='Select Menu'
                            items={menuInputItems}
                            placeholder="Select one Menu"
                            noResultsMessage="Create one atleast one menu"
                            getA11ySelectionMessage={{
                                onAdd: item => `${item} has been selected.`,
                            }}
                            defaultValue={state.selectedMenu}
                            value={state.selectedMenu}
                            onChange={(e,value)=>setState({...state, selectedMenu: value.value})}
                        />
                        {
                            state.selectedMenu &&
                            <Input 
                                label="Sub Menu" 
                                placeholder='Type in Sub menu'
                                style={{justifyContent: 'flex-start'}}
                                errorMessage={state.subMenuNameError && state.subMenuNameError}
                                onChange={(e)=>setState({...state, subMenuNameError: false, subMenuName: e.target.value})}
                                value={state.subMenuName}
                                required
                            />
                        }
                        
                    </Flex>
                    {
                        state.selectedMenu &&
                        <Flex gap="gap.smaller" style={{marginTop: 20, marginLeft: 10}}>
                            <Button primary onClick={handleCreateSubMenu}>
                                <AddIcon style={{marginRight: 5}}/> Save
                            </Button>
                            <Button seconday onClick={()=>setState({...state, selectedMenu: '', subMenuName: ''})}>
                                <CloseIcon style={{marginRight: 5}}/> Cancel
                            </Button>
                        </Flex>
                    }
                </Form>
            )
        }else if(state.activeTab==='step3'){
            menuInputItems = [];
            var subMenuInputItems = [];
            var subSubMenuInputItems = [];
            state.menuList.forEach((menu)=>{
                menuInputItems.push(menu.title)
                if(menu.title===state.selectedMenu){
                    menu.subMenuList.forEach((subMenu)=>{
                        subMenuInputItems.push(subMenu.title)

                        if(subMenu.title===state.selectedSubMenu){
                            subMenu.subSubMenuList.forEach((subSubMenu)=>{
                                subSubMenuInputItems.push(subSubMenu.title)
                            })
                        }
                    })
                }
            })
            return(
                <Form style={{justifyContent: 'flex-start', height: 'auto'}}>
                    <Flex gap="gap.smaller">
                        <FormDropdown
                            label='Select Menu'
                            items={menuInputItems}
                            placeholder="Select one Menu"
                            noResultsMessage="Create one atleast one Menu"
                            getA11ySelectionMessage={{
                                onAdd: item => `${item} has been selected.`,
                            }}
                            defaultValue={state.selectedMenu}
                            value={state.selectedMenu}
                            onChange={(e,value)=>setState({...state, selectedMenu: value.value, selectedSubMenu: ''})}
                        />
                        {
                            state.selectedMenu &&
                            <FormDropdown
                                label='Select Sub Menu'
                                items={subMenuInputItems}
                                placeholder="Select one Menu"
                                noResultsMessage="Create one atleast one sub menu"
                                getA11ySelectionMessage={{
                                    onAdd: item => `${item} has been selected.`,
                                }}
                                defaultValue={state.selectedSubMenu}
                                value={state.selectedSubMenu}
                                onChange={(e,value)=>setState({...state, selectedSubMenu: value.value})}
                            />
                        }
                        
                        {
                            state.selectedSubMenu &&
                            <Input 
                                label="Sub Sub Menu Header" 
                                placeholder='Type in Sub Sub menu'
                                style={{justifyContent: 'flex-start'}}
                                errorMessage={state.subSubMenuNameError && state.subSubMenuNameError}
                                onChange={(e)=>setState({...state, subSubMenuNameError: false, subSubMenuName: e.target.value})}
                                value={state.subSubMenuName}
                                required
                            />
                        }
                    </Flex>
                    {
                        state.subSubMenuName &&
                        <Flex gap="gap.smaller">
                            <Input 
                                placeholder='items of this sub menu'
                                style={{justifyContent: 'flex-start'}}
                                errorMessage={state.itemNameError && state.itemNameError}
                                onChange={(e)=>setState({...state, itemNameError: false, itemName: e.target.value})}
                                value={state.itemName}
                                required
                            />
                            <Button primary circular onClick={handleCreateItem}>
                                <AddIcon/>
                            </Button>
                        </Flex>
                    }

                    {
                        state.subSubMenuName && 
                        <>
                            <Header as="h3" style={{margin: 0}} content={state.subSubMenuName} />
                            <Divider style={{margin: 0}}/>
                            {
                                state.subSubMenuName && state.itemList && state.itemList.length>0 ? state.itemList.map((item, index)=>{
                                    return(
                                        <p style={{margin: 2}}>{`${index+1}  ${item}`}</p>
                                    )
                                }) : 'Add some items to click plus icon'
                            }
                        </>
                    }

                    {
                        state.subSubMenuName &&
                        <Flex gap="gap.smaller" style={{marginTop: 10}}>
                            <Button primary onClick={handleCreateSubSubMenu}>
                                <AddIcon style={{marginRight: 5}}/> Save
                            </Button>
                            <Button seconday onClick={()=>setState({...state, subSubMenuName: '', subMenuName: ''})}>
                                <CloseIcon style={{marginRight: 5}}/> Cancel
                            </Button>
                        </Flex>
                    }
                </Form>
            )
        }
    }

    const handleCreateItem = () => {
        var itemList = state.itemList;
        if(!state.itemName){return null}
        itemList.push(state.itemName)
        setState({...state, itemList, itemName: '', isSuccess: true})
        setTimeout(()=>{
            setState({
                ...state,
                itemName: '',
                isSuccess: false
            })
        }, 1000)
    }

    const handleCreateMenu = () => {
        var menuList = state.menuList;
        if(!state.menuName){
            setState({
                ...state,
                menuNameError: 'Menu name is required'
            })
            return null
        }
        menuList.push({
            key: state.menuName,
            title: state.menuName,
            subMenuList: []
        });
        setState({...state, menuList, menuName: '', isSuccess: true})
        setTimeout(()=>{
            setState({
                ...state,
                menuName: '',
                isSuccess: false
            })
        }, 1000)
    }

    const handleCreateSubMenu = () => {
        var menuList = state.menuList;
        if(!state.subMenuName){
            setState({
                ...state,
                subMenuNameError: 'Sub menu name is required'
            })
            return null
        }

        menuList.forEach((menu)=>{
            if(menu.title===state.selectedMenu){
                menu.subMenuList.push({
                    key: state.subMenuName,
                    title: state.subMenuName,
                    subSubMenuList: []
                })
            }
        })
        setState({
            ...state,
            menuList,
            subMenuName: '',
            selectedMenu: '',
            isSuccess: true
        })
        setTimeout(()=>{
            setState({
                ...state,
                subMenuName: '',
                selectedMenu: '',
                isSuccess: false
            })
        }, 1000)
    }

    const handleCreateSubSubMenu = () => {
        var menuList = state.menuList;
        menuList.forEach((menu)=>{
            if(menu.title===state.selectedMenu){
                menu.subMenuList.forEach((subMenu)=>{
                    if(subMenu.title===state.selectedSubMenu){
                        subMenu.subSubMenuList.push({
                            header: state.subSubMenuName,
                            items: state.itemList
                        })
                    }
                })
            }
        })
        setState({
            ...state,
            menuList,
            selectedMenu: '',
            selectedSubMenu: '',
            subSubMenuName: '',
            itemList: [],
            isSuccess: true
        })
        setTimeout(()=>{
            setState({
                ...state,
                selectedMenu: '',
                selectedSubMenu: '',
                subSubMenuName: '',
                itemList: [],
                isSuccess: false
            })
        }, 1000)
    }

    useEffect(()=>{
        handleGetMegaMenuList()   
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleGetMegaMenuList = () => {
        var megaMenu = localStorage.getItem('megaMenu');
        if(megaMenu){
            var menuList = JSON.parse(megaMenu);
            setState({
                ...state,
                menuList
            })
        }
    }

    const handleSetMegaMenuList = () => {
        localStorage.setItem('megaMenu', JSON.stringify(state.menuList));
        setState({...state, isSuccess: true})
        setTimeout(()=>{
            setState({
                ...state,
                isSuccess: false
            })
        }, 1000)
    }

    return(
        <>
            <Grid columns="repeat(4, 1fr)" rows="50px 150px 50px" className='grid-row'>
                {
                    state.isSuccess &&
                    <Header as="h5" className='flash-msg'>
                        <AcceptIcon/> Added Successfully !
                    </Header>
                }
                <Segment
                    color="white"
                    content="Menu"
                    styles={{
                        gridColumn: 'span 1',
                        gridRow: '1/8',
                    }}
                    className='left-setting'
                >
                    <Header as="h3" content="Settings" />
                    <Divider/>
                    <Header as="h4" content="Settings" />
                    <Menu 
                        defaultActiveIndex={0} 
                        items={items} 
                        vertical 
                        pointing 
                        onItemClick={handleClickMenu}
                    />
                </Segment>
                <Segment
                    content="Content"
                    styles={{
                        gridColumn: 'span 4',
                        gridRow: '1/8',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <div className='header-content'>
                        <Header
                            as="h3"
                            content="Configure Navigation"
                        />
                        <p>The mega menu configured here</p>
                    </div>
                    <div className='header-content'>
                        <Header
                            as="h4"
                            content="Add navigation entries"
                        />
                        <p>Here is an example of how a section can be used to group inputs</p>
                    </div>
                    {renderTabContentSection()}
                    <Flex gap="gap.smaller" style={{marginTop: 10, justifyContent: 'flex-end'}}>
                        <Button seconday onClick={handleGetMegaMenuList} content='Discard'/>
                        <Button primary onClick={handleSetMegaMenuList} content='Save'/>
                    </Flex>
                    {/* <Accordion defaultActiveIndex={[0]} panels={tabPanels}/> */}
                </Segment>
            </Grid>
        </>
    )
}
export default Setting;
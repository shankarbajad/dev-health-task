// This component holds the app sidebar menus

import { Menu } from '@fluentui/react-northstar';
import { 
    AppsIcon, 
    BellIcon, 
    AudienceIcon,
    FilesFlashIcon,
    SettingsIcon,
    GalleryNewIcon,
    QuestionCircleIcon,
    MoreIcon,
    CalendarIcon 
} from '@fluentui/react-icons-northstar';

const items = [
    {
        icon: (
            <AppsIcon
            {...{
                outline: true,
            }}
            />
        ),
        key: 'home',
        content: 'home',
    },
    {
        icon: <BellIcon {...{}} />,
        key: 'activity',
        content: 'activity',
    },
    {
        icon: <AudienceIcon {...{}} />,
        key: 'teams',
        content: 'teams',
    },
    {
        icon: <CalendarIcon {...{}} />,
        key: 'calendar',
        content: 'calendar',
    },
    {
        icon: <FilesFlashIcon {...{}} />,
        key: 'file',
        content: 'file',
    },
    {
        icon: <MoreIcon {...{}} />,
        key: 'more',
        menu: {
            items: [
                {
                    key: '1',
                    content: 'item1',
                },
                {
                    key: '2',
                    content: 'item2',
                },
                {
                    key: '3',
                    content: 'item3',
                },
            ],
        },
    },
    {
        icon: <GalleryNewIcon {...{}} />,
        key: 'gallery',
        content: 'gallery',
    },
    {
        icon: <QuestionCircleIcon {...{}} />,
        key: 'help',
        content: 'help',
    },
    {
        icon: <SettingsIcon {...{}} />,
        key: 'setting',
        content: 'setting',
    },
]

const Sidebar = (props) => {

    const handleMenuClick = (e, val) => {
        console.log(999)
    }

    return(
        <Menu 
            className='sidebar-menu'
            defaultActiveIndex={0} 
            items={items} 
            vertical 
            pointing
            onItemClick={handleMenuClick}
        />
    )
}
export default Sidebar;
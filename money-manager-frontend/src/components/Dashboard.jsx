import { useContext } from 'react';
import MenuBar from './MenuBar'
import Sidebar from './Sidebar';
import { AppContext } from '../context/AppContext';

const Dashboard = ({children, activeMenu}) => {

    const {user} = useContext(AppContext);



  return (
    <div>
        <MenuBar activeMenu={activeMenu}/>

        {user && (
            <div className='flex'>
                <div className='max-[180]:hidden'>
                    <Sidebar activeMenu={activeMenu}/>

                </div>

                <div className='flex-1 bg-purple-50 min-h-screen p-5'>
                    {children}

                </div>

            </div>
        )}
              
    </div>
  )
}

export default Dashboard

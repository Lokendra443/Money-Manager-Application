import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hooks/useUser';
import { TurkishLira } from 'lucide-react';
import { axiosConfig } from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import IncomeList from '../components/IncomeList';

const Income = () => {

  useUser();

  const[incomeData, setIncomeData] = useState([]);
  const[categories, setCategories] = useState([]);
  const[loading, setLoading] = useState(false);

  const[openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const[openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (response.status === 200) {
        console.log("Income list: ", response.data);
        setIncomeData(response.data);
      }
      
    } catch (error) {
      console.error("Failed to fetch income details: ", error);
      toast.error(error.response?.data?.message || "Failed to fetch income details");     
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchIncomeDetails();
  }, [])




  
  return (
    <Dashboard activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div>
            {/* overview for income with line chart */}
          </div>

          <IncomeList transactions = {incomeData}/>

        </div>

      </div>
    </Dashboard>
  )
}

export default Income

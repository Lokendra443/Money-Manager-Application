import { Download, Mail } from 'lucide-react'
import React from 'react'

const IncomeList = ({transactions}) => {
  return (
    <div>
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Income Sources</h5>

                <div className='flex items-center justify-end gap-2'>
                    <button className='card-btn'>
                        <Mail size={15} className='text-base'/>Email
                    </button>
                    <button className='card-btn'>
                        <Download size={15} className='text-base'/>Download
                    </button>
                </div>               
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2'>
                {/* display the incomes */}

            </div>

        </div>
      
    </div>
  )
}

export default IncomeList

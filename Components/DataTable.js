import React, { useState } from 'react'
import { convertTo12HourFormat } from '../Helper/Helper'

function DataTable({ datasets, setSleepData }) {

    const { sample1, sample2, sample3 } = datasets;
    const [dataTitle, setDataTitle] = useState('Sample1' || '');
    const [currentDataset, setCurrentDataset] = useState(sample1 || []);

    return (
        <div className='data-container'>
            <h2>{dataTitle}</h2>
            <div className='btn-block'>
                <button className='btn btn-primary' onClick={() => { setCurrentDataset(sample1); setSleepData(sample1); setDataTitle('Sample1') }}>Sample 1</button>
                <button className='btn btn-primary' onClick={() => { setCurrentDataset(sample2); setSleepData(sample2); setDataTitle('Sample2') }}>Sample 2</button>
                <button className='btn btn-primary' onClick={() => { setCurrentDataset(sample3); setSleepData(sample3); setDataTitle('Sample3') }}>Sample 3</button>
            </div>
            <div className='data-table'>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" >Day</th>
                                <th scope="col" >Slot 1</th>
                                <th scope="col" >Slot 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentDataset.map((data, index) => (
                                <tr key={index}>
                                    <td >
                                        {data.day}
                                    </td>
                                    {data.slots.map((slot, index1) => (
                                        <td className='border' key={index1}>
                                            {convertTo12HourFormat(slot.sleepStart)}
                                            <i className="bi bi-caret-right align-self-center" ></i>
                                            {convertTo12HourFormat(slot.sleepEnd)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DataTable
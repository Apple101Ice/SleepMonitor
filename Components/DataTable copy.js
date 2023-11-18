import React, { useState } from 'react'
import { convertTo12HourFormat, days, getHours, getMinutes } from '../Helper/Helper'

function DataTable({ datasets }) {

    const { sample1, sample2, sample3 } = datasets;

    const [dataTitle, setDataTitle] = useState('Sample1' || '');
    const [currentDataset, setCurrentDataset] = useState(sample1 || []);


    return (
        <div className='data-container'>
            <h2>{dataTitle}</h2>
            <div className='btn-block'>
                <button className='btn btn-primary' onClick={() => { setCurrentDataset(sample1); setDataTitle('Sample1') }}>Sample 1</button>
                <button className='btn btn-primary' onClick={() => { setCurrentDataset(sample2); setDataTitle('Sample2') }}>Sample 2</button>
                <button className='btn btn-primary' onClick={() => { setCurrentDataset(sample3); setDataTitle('Sample3') }}>Sample 3</button>
            </div>
            <div className='data-table'>
                <table className='table'>
                    {/* <thead className='border bg-secondary'>
                        <tr>
                            <th scope="col">Day</th>
                            <th scope="col">Sleep Start</th>
                            <th scope="col">Sleep End</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {currentDataset.map((data, index) => (
                            <tr key={index}>
                                <td className='border'>{data.day}</td>
                                {Object.keys(data).map((key) => {
                                    if (key.includes('slot')) {
                                        return (
                                            <React.Fragment key={key}>
                                                <td className='border'>{convertTo12HourFormat(data[key].sleepStart)}</td>
                                                <td className='border'>{convertTo12HourFormat(data[key].sleepEnd)}</td>
                                            </React.Fragment>
                                        );
                                    }
                                    return null; // Exclude other keys
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default DataTable
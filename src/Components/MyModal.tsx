import React, { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart'
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import exit from '../assets/cross.png'
import chart from '../assets/bar-chart.png'

export default function Modal(props) {
    const [modal, setModal] = useState(false);

    function toggleModal() {
        setModal(prev => !prev);
    }

    function getCurrentWeekDates() {
        const today = new Date();
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Start of the week (Sunday)
        const weekDates = [];
      
        for (let i = 0; i < 7; i+=6) {
          const date = new Date(firstDayOfWeek);
          date.setDate(firstDayOfWeek.getDate() + i);
          
          // Format as "MM/DD"
          const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
          weekDates.push(formattedDate);
        }
      
        return weekDates;
      }
      const chartSetting = {
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translate(-20px, 0)',
            },
          },
      }
      const currDates = `${getCurrentWeekDates()[0]} - ${getCurrentWeekDates()[1]}`

    return (
        
        <> 
        <img id="chart" src={chart} onClick={toggleModal}/>
        {modal && 
        <>

            <div className="modal">
                <div className="overlay">
                    <div className="modal-content" onClick={toggleModal}>
                        <h2>Weekly Summary</h2>
                        <p>{currDates}</p>
                        <img src={exit} id="exitButton" />
                        <BarChart
                            xAxis={[
                                {
                                id: 'barCategories',
                                data: ['Sunday', 'Monday', 'Tuesday', 'Wednesday',' Thursday','Friday','Saturday'],
                                scaleType: 'band',
                                },
                            ]}
                            yAxis={[
                                {
                                    label: 'hours worked',
                                    min: 0, // Start at 0
                                    tickInterval: [0, 4, 8], // 1 hour interval (in seconds)
                                    valueFormatter: (value) => {
                                      const hours = value / 3600;
                                      return hours >= 1 ? `${hours}h` : `${Math.round(value / 60)}m`;
                                    },
                                },
                              ]}
                            series={[
                                {
                                data: props.timeSpentArray,
                                },
                            ]}
                            margin={{
                                bottom: 120,
                                left: 70
                            }}
                            {...chartSetting}
                        />
                        
                    </div>
                </div>
            </div></>}
        </>
        
    )
}
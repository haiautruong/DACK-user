import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Cookies } from 'react-cookie';
import tutorApi from '../api/tutor.api';

const cookie = new Cookies();

const IncomeStatistics = () => {
  const [income, setIncome] = useState({
    date: [],
    value: []
  });
  useEffect(() => {
    const curUser = cookie.get('CURR_USER');
    tutorApi.getIncomeStatistics(curUser.email).then(res => {
      setIncome(res.data);
    });
  }, []);

  const data = {
    labels: income.date,
    datasets: [
      {
        label: 'Income',
        backgroundColor: 'rgba(44,226,18,0.39)',
        borderColor: 'rgb(25,125,22)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(44,226,18,0.63)',
        hoverBorderColor: 'rgb(26,127,22)',
        data: income.value
      }
    ]
  };

  return (
    <div>
      <h2>Income Statistics</h2>
      <Bar
        data={data}
        height={100}
        options={{
          maintainAspectRatio: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  min: 0
                }
              }
            ]
          }
        }}
      />
    </div>
  );
};

export default IncomeStatistics;

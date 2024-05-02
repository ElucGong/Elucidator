"use client"

import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const DoughtnutChart = ({name, title, data}) => {
  const chartRef = useRef()

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current)
    const option = {
      title: {
        text: title,
        left: 'center',
        top: "5%"
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: name,
          type: 'pie',
          radius: ['35%', '60%'],
          avoidLabelOverlap: false,
          label: {
            show: true
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: data
        }
      ]
    }
    chartInstance.setOption(option)
  })


  return (
    <div>
      <div ref={chartRef} style={{ width: 500, height: 300 }}>
      </div>
    </div>
  )
}

export default DoughtnutChart
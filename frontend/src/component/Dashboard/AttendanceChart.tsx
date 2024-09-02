import  { FC } from 'react'
import Chart from "react-apexcharts";
import { attendanceChartOptions, attendanceSeries } from '../../utils/options/attendanceChartOptions';
type AttendanceChartProps = {}

const AttendanceChart : FC<AttendanceChartProps>= ({}) => {
  return (
        <Chart height={430}  options={attendanceChartOptions}  series={attendanceSeries} type='bar'/>
  )
}

export default AttendanceChart
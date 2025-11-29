import {PieChart, Pie, Cell, Legend} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {byAge} = props
  return (
    <div className="age_chart_container">
      <h1 className="charts_heading">Vaccination By Age</h1>
      <PieChart width={300} height={300}>
        <Pie
          cx="50%"
          cy="50%"
          data={byAge}
          startAngle={0}
          endAngle={360}
          dataKey="count"
        >
          <Cell name="18-44" fill="#2cc6c6" />
          <Cell name="45-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend iconType="circle" layout="horizontal" align="center" />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge

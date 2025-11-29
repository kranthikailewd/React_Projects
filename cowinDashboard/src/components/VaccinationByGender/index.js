import {PieChart, Pie, Cell, Legend} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {byGender} = props
  return (
    <div className="gender_chart_container">
      <h1 className="charts_heading">Vaccination By Gender</h1>
      <PieChart width={300} height={300}>
        <Pie
          cx="50%"
          cy="50%"
          data={byGender}
          startAngle={180}
          endAngle={0}
          innerRadius="40%"
          outerRadius="80%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend iconType="circle" layout="horizontal" align="center" />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender

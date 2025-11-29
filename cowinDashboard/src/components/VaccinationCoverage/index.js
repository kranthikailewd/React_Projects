import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {weekData} = props

  const DateFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="week_chart_container">
      <h1 className="charts_heading">Vaccination Coverage</h1>
      <BarChart data={weekData} width={340} height={200} className="barchart">
        <XAxis dataKey="vaccineDate" tick={{stroke: 'gray'}} />
        <YAxis tick={{stroke: 'gray'}} tickFormatter={DateFormatter} />
        <Legend iconType="square" />
        <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="14%" />
        <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="14%" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage

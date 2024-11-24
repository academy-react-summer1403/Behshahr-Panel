// ** Third Party Components
import Chart from 'react-apexcharts'
import { MoreVertical, Circle } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

const Sales = props => {
  const options = {
      chart: {
        height: 300,
        type: 'radar',
        dropShadow: {
          enabled: true,
          blur: 8,
          left: 1,
          top: 1,
          opacity: 0.2
        },
        toolbar: {
          show: false
        },
        offsetY: 5
      },
      stroke: {
        width: 0
      },
      dataLabels: {
        background: {
          foreColor: ['#ebe9f1']
        }
      },
      legend: { show: false },
      colors: [props.primary, props.info],
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: ['#ebe9f1', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent'],
            connectorColors: 'transparent'
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: [props.primary, props.info],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      labels: ['Angular', 'TailwindCss', 'Script', 'ReactJs', 'NextJs'],
      markers: {
        size: 0
      },
      yaxis: {
        show: false
      },
      grid: {
        show: false,
        padding: {
          bottom: -27
        }
      }
    },
    series = [
      {
        name: 'Sales',
        data: [90, 50, 86, 40, 100, 20]
      },
      {
        name: 'Visit',
        data: [70, 75, 70, 76, 20, 85]
      }
    ]
  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-start pb-1'>
        <div>
          <CardTitle className='mb-25' tag='h4'>
            تعداد کامنت ها به تفکیک دوره ها
          </CardTitle>
        </div>
      </CardHeader>

      <CardBody>
        <Chart options={options} series={series} type='radar' height={300} />
      </CardBody>
    </Card>
  )
}
export default Sales
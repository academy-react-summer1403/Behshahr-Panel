import Chart from "react-apexcharts";
import { HelpCircle } from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";

const GoalOverview2 = ({ data }) => {
  const activeUserPercent = Math.round(
    parseFloat(data?.activeUserPercent) || 0
  );
  const inCompeletUserCount = Math.round(
    parseFloat(data?.inCompeletUserCount) || 0
  );
  const deactiveUsers = Math.round(parseFloat(data?.deactiveUsers) || 0);
  const options = {
    chart: {
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        blur: 3,
        left: 1,
        top: 1,
        opacity: 0.1,
      },
    },
    colors: ["#51e5a8"],
    plotOptions: {
      radialBar: {
        offsetY: 10,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: "77%",
        },
        track: {
          background: "#ebe9f1",
          strokeWidth: "50%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            color: "#5e5873",
            fontFamily: "Montserrat",
            fontSize: "2.86rem",
            fontWeight: "600",
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    grid: {
      padding: {
        bottom: 30,
      },
    },
  };

  const series = [activeUserPercent];

  const usersBelow80 = deactiveUsers;
  const usersAbove80 = inCompeletUserCount;

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">
          درصد تکمیل پروفایل کاربران (بالای 80 درصد)
        </CardTitle>
        <HelpCircle size={18} className="text-muted cursor-pointer" />
      </CardHeader>
      <CardBody className="p-0">
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height={245}
        />
      </CardBody>
      <Row className="border-top text-center mx-0">
        <Col xs="6" className="border-end py-1">
          <CardText className="text-muted mb-0">تعداد زیر 80 درصد</CardText>
          <h3 className="fw-bolder mb-0">
            {usersBelow80} {/* اینجا تعداد کمتر از 80 درصد از پراپس می‌آید */}
          </h3>
        </Col>
        <Col xs="6" className="py-1">
          <CardText className="text-muted mb-0">تعداد بالای 80 درصد</CardText>
          <h3 className="fw-bolder mb-0">
            {usersAbove80} {/* اینجا تعداد بیشتر از 80 درصد از پراپس می‌آید */}
          </h3>
        </Col>
      </Row>
    </Card>
  );
};

export default GoalOverview2;

import * as React from "react";
import * as moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {Bar, Line} from "react-chartjs-2";
import {MenuItem, Select} from "@mui/material";
import {useSelector} from "react-redux";
import {useState} from "react";

import {getReaders} from "../store/readers/selectors";


enum ChartMode {
  LINE,
  VERTICAL_BAR,
  HORIZONTAL_BAR,
}

const Labels = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

// регистрирует плагины для графика
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const ChartPage: React.FC = (): JSX.Element => {
  const readers = useSelector(getReaders);
  const takenBooks = readers.filter((reader) => reader.books.length)
    .flatMap((reader) => reader.books);

  const chartModes = (Object.keys(ChartMode) as Array<keyof typeof ChartMode>).filter((key) => isNaN(+key) === true);
  const [chartMode, setChartMode] = useState(ChartMode.LINE);

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setChartMode(+event.target.value);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: `top` as const,
      },
      title: {
        display: true,
        text: `TAKING BOOKS`,
        color: `#558b2f`,
        font: {
          size: 25,
          weight: `bold`,
        },
      },
    },
  };

  const verticalChartOptions = {
    ...options,
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
  };

  const nowMonth = moment().get(`month`);
  const nowYear = moment().get(`year`);
  const labels = [];

  for (let i = Labels.length - 1; i >= 0; i--) {
    labels.push(nowMonth - i < 0 ? Labels[nowMonth + Labels.length - i]
      : Labels[nowMonth - i]);
  }

  const data = labels.map((label) => takenBooks.filter((book) => {
    const month = book.dateOfTaking.get(`month`);
    const year = book.dateOfTaking.get(`year`);

    return month <= nowMonth ? year === nowYear && month === Labels.indexOf(label)
      : year === nowYear - 1 && month === Labels.indexOf(label);
  }).length);

  const chartData = {
    labels,
    datasets: [
      {
        label: ``,
        data,
        borderColor: `rgb(255, 99, 132)`,
        backgroundColor: `rgba(255, 99, 132, 0.5)`,
      },
    ],
  };

  return (
    <div className="chart-wrapper">
      <Select
        id="chartSelect"
        variant="standard"
        sx={{ m: 1, minWidth: 300 }}
        value={chartMode}
        onChange={handleSelectChange}
      >
        {
          chartModes.map((mode, index) => {
            const label = mode.toLocaleLowerCase().split(`_`).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(` `) + ` Chart`;
            return (
              <MenuItem value={ChartMode[mode]} key={mode + index}>{label}</MenuItem>
            );
          })
        }
      </Select>

      <div className="chart">
        {chartMode === ChartMode.LINE && <Line options={options} data={chartData} />}
        {chartMode === ChartMode.VERTICAL_BAR && <Bar options={options} data={chartData} />}
        {chartMode === ChartMode.HORIZONTAL_BAR && <Bar options={verticalChartOptions} data={chartData} />}
      </div>
    </div>
  );
};

import * as React from "react";
import * as moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";
import {useSelector} from "react-redux";

import {getReaders} from "../store/readers/selectors";


const Labels = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

// регистрирует плагины для графика
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const ChartPage: React.FC = (): JSX.Element => {
  const readers = useSelector(getReaders);
  const takenBooks = readers.filter((reader) => reader.books.length)
    .flatMap((reader) => reader.books);

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
    <Line options={options} data={chartData} />
  );
};

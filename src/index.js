import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { DataContext } from './context';

//https://codesandbox.io/s/jolly-jones-cx4cw?file=/src/components/Modal.js

const Main = () => {
  const initialBoards = [
    {
      id: 823621,
      title: 'проект',
      lists: []
    },
    {
      id: 12736282,
      title: 'Дом',
      lists: [
        {
          id: 23273232,
          title: 'Домашние дела',
          cards: [
            {
              id: 1223244,
              title: 'Повседневное',
              description: 'Рутинные дела...',
              type: 'checklist',
              checks: [
                {
                  id: 132425,
                  title: 'сходить в магазин',
                  checked: true
                },
                {
                  id: 525426,
                  title: 'Заправить машину',
                  checked: false
                },
                {
                  id: 1164243242,
                  title: 'сходить за сигаретами',
                  checked: true
                },
              ]
            },
            {
              id: 122633247,
              title: 'Гараж',
              description: 'Что там можно починить под пивко',
              type: 'checklist',
              checks: [
                {
                  id: 16343428,
                  title: 'Заменить зимнюю резину',
                  checked: true
                },
              ]
            },
          ]
        },
        {
          id: 72242,
          title: 'Дети',
          cards: [
            {
              id: 43843,
              title: 'школа',
              description: '',
              type: 'checklist',
              checks: [
                {
                  id: 13242,
                  title: 'Купить учебники',
                  checked: true
                },
              ]
            }
          ]
        }
      ]
    },
  ];

  const [boards, setBoards] = useState(initialBoards);
  return (
    <React.StrictMode>
      <DataContext.Provider value={{boards, setBoards}}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DataContext.Provider>
    </React.StrictMode>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);

reportWebVitals();

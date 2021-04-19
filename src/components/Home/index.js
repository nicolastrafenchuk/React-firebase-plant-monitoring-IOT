import React, { useState, useCallback, useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Button } from '@material-ui/core';

import { FirebaseContext } from '../../context/Firebase';
import TabPanel from './TabPanel';
import VizualizationTab from './VizualizationTab';

const CHART_ITEMS_LIMIT = 20;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [humidity, setHumidity] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [pressure, setPressure] = useState([]);
  const [soilMoisture, setSoilMoisture] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date(Date.now() - 10800000));

  const { getTemperatureCollection, onCollectionSnapshotListener } = useContext(
    FirebaseContext,
  );

  const handleTabChange = useCallback((_, value) => {
    setCurrentTab(value);
  }, []);

  const handleDateToChange = useCallback((date) => {
    setDateTo(date);
  }, []);

  const handleDateFromChange = useCallback((date) => {
    setDateFrom(date);
  }, []);

  const getDate = useCallback(() => {
    const dataT = [];

    getTemperatureCollection()
      .orderBy('dateAndTime', 'desc')
      .where('dateAndTime', '>=', dateFrom)
      .where('dateAndTime', '<=', dateTo)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const check = documentSnapshot.data();
          const obj = {
            x: `${check.dateAndTime
              .toDate()
              .toLocaleTimeString()} Day: ${check.dateAndTime
              .toDate()
              .toLocaleDateString()}`,
            y: check.temperature.toFixed(4),
          };
          dataT.unshift(obj);
        });
        setTemperature(dataT);
      });
  }, [dateFrom, dateTo, getTemperatureCollection]);

  useEffect(() => {
    setLoading(true);

    const [
      tempChangeListerRemove,
      humidityChangeListerRemove,
      soilMoistureListenerRemove,
      pressureChangeListerRemove,
    ] = [
      {
        collection: 'temperature',
        limit: CHART_ITEMS_LIMIT,
        callback: (temperatureData) => {
          setTemperature(temperatureData);
        },
      },
      {
        collection: 'humidity',
        limit: CHART_ITEMS_LIMIT,
        callback: (humidityData) => {
          setHumidity(humidityData);
        },
      },
      {
        collection: 'humidity_g',
        limit: CHART_ITEMS_LIMIT,
        valueName: 'humidity',
        callback: (soilMoistureData) => {
          setSoilMoisture(soilMoistureData);
        },
      },
      {
        collection: 'pressure',
        limit: CHART_ITEMS_LIMIT,
        callback: (pressureData) => {
          setPressure(pressureData);
        },
      },
    ].map(({ collection, limit, valueName = '', callback }) => {
      if (valueName) {
        return onCollectionSnapshotListener(
          collection,
          limit,
          callback,
          valueName,
        );
      }

      return onCollectionSnapshotListener(collection, limit, callback);
    });

    return () => {
      tempChangeListerRemove();
      humidityChangeListerRemove();
      soilMoistureListenerRemove();
      pressureChangeListerRemove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      temperature.length &&
      humidity.length &&
      pressure.length &&
      soilMoisture.length
    ) {
      setLoading(false);
    }
  }, [
    humidity.length,
    pressure.length,
    soilMoisture.length,
    temperature.length,
  ]);

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="secondary"
        aria-label="vizualization-tabs"
      >
        <Tab label="Temperature" />
        <Tab label="Humidity" />
        <Tab label="Moisture" />
        <Tab label="Pressure" />
      </Tabs>
      <TabPanel
        value={currentTab}
        index={0}
        id="viz-tab-0"
        aria-controls="viz-tabpanel-0"
      >
        <VizualizationTab
          data={temperature}
          label="Temperature, 🌡 ℃"
          colorScheme="set1"
          loading={loading}
        />
      </TabPanel>
      <TabPanel
        value={currentTab}
        index={1}
        id="viz-tab-1"
        aria-controls="viz-tabpanel-1"
      >
        <VizualizationTab
          data={humidity}
          label="Humidity, 💧 %Rh"
          colorScheme="paired"
          loading={loading}
        />
      </TabPanel>
      <TabPanel
        value={currentTab}
        index={2}
        id="viz-tab-2"
        aria-controls="viz-tabpanel-2"
      >
        <VizualizationTab
          data={soilMoisture}
          label="Moisture, 💧 %Rh"
          colorScheme="set2"
          loading={loading}
        />
      </TabPanel>
      <TabPanel
        value={currentTab}
        index={3}
        id="viz-tab-3"
        aria-controls="viz-tabpanel-3"
      >
        <VizualizationTab
          data={pressure}
          label="Pressure, ⬇️ hPa"
          colorScheme="nivo"
          loading={loading}
        />
      </TabPanel>
      <Paper
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          margin: '0 20px',
          textAlign: 'center',
        }}
      >
        <Typography display="inline" variant="subtitle1">
          Now showing period{' '}
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Typography display="inline" variant="subtitle1">
            from:
          </Typography>
          <DateTimePicker
            ampm={false}
            showTodayButton
            value={dateFrom}
            onChange={handleDateFromChange}
            style={{ marginLeft: 15, marginRight: 15 }}
          />
          <Typography display="inline" variant="subtitle1">
            to:
          </Typography>
          <DateTimePicker
            ampm={false}
            showTodayButton
            value={dateTo}
            onChange={handleDateToChange}
            style={{ marginLeft: 15, marginRight: 15 }}
          />
        </MuiPickersUtilsProvider>
        <Button onClick={getDate}>Set period</Button>
      </Paper>
    </>
  );
};

export default Home;

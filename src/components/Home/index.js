import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { FirebaseContext } from '../../context/Firebase';
import TabPanel from './TabPanel';
import VizualizationTab from './VizualizationTab';

const CHART_ITEMS_LIMIT = 5;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [humidity, setHumidity] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [pressure, setPressure] = useState([]);
  const [soilMoisture, setSoilMoisture] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const tempOnChangeListener = useRef();
  const humidityOnChangeListener = useRef();
  const soilMoistureOnChangeListener = useRef();
  const pressureOnChangeListener = useRef();

  const { onCollectionSnapshotListener, getCollectionWithPeriod } = useContext(
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

  const getPeriodData = useCallback(() => {
    const collections = ['temperature', 'humidity', 'humidity_g', 'pressure'];
    const callbacks = [
      setTemperature,
      setHumidity,
      setSoilMoisture,
      setPressure,
    ];

    if (
      tempOnChangeListener.current &&
      humidityOnChangeListener.current &&
      soilMoistureOnChangeListener.current &&
      pressureOnChangeListener.current
    ) {
      tempOnChangeListener.current();
      humidityOnChangeListener.current();
      soilMoistureOnChangeListener.current();
      pressureOnChangeListener.current();

      tempOnChangeListener.current = null;
      humidityOnChangeListener.current = null;
      soilMoistureOnChangeListener.current = null;
      pressureOnChangeListener.current = null;
    }

    setLoading(true);

    getCollectionWithPeriod(
      collections[currentTab],
      dateFrom,
      dateTo,
      callbacks[currentTab],
      currentTab === 2 ? 'humidity' : '',
    ).then(() => {
      setLoading(false);
    });
  }, [currentTab, dateFrom, dateTo, getCollectionWithPeriod]);

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

    tempOnChangeListener.current = tempChangeListerRemove;
    humidityOnChangeListener.current = humidityChangeListerRemove;
    soilMoistureOnChangeListener.current = soilMoistureListenerRemove;
    pressureOnChangeListener.current = pressureChangeListerRemove;

    return () => {
      if (
        tempOnChangeListener.current &&
        humidityOnChangeListener.current &&
        soilMoistureOnChangeListener.current &&
        pressureOnChangeListener.current
      ) {
        tempChangeListerRemove();
        humidityChangeListerRemove();
        soilMoistureListenerRemove();
        pressureChangeListerRemove();
      }
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
          handleDateToChange={handleDateToChange}
          handleDateFromChange={handleDateFromChange}
          getPeriodData={getPeriodData}
          dateTo={dateTo}
          dateFrom={dateFrom}
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
          handleDateToChange={handleDateToChange}
          handleDateFromChange={handleDateFromChange}
          getPeriodData={getPeriodData}
          dateTo={dateTo}
          dateFrom={dateFrom}
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
          handleDateToChange={handleDateToChange}
          handleDateFromChange={handleDateFromChange}
          getPeriodData={getPeriodData}
          dateTo={dateTo}
          dateFrom={dateFrom}
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
          handleDateToChange={handleDateToChange}
          handleDateFromChange={handleDateFromChange}
          getPeriodData={getPeriodData}
          dateTo={dateTo}
          dateFrom={dateFrom}
        />
      </TabPanel>
    </>
  );
};

export default Home;

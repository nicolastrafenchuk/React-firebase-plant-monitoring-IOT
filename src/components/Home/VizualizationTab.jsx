import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { patternLinesDef } from '@nivo/core';
import { ResponsiveLine } from '@nivo/line';

import Loading from '../Loading';

const VizualizationTab = ({ data, label, colorScheme, loading }) => {
  const normalizedData = useMemo(() => {
    const parsedData = data.map(({ x, y }) => {
      return {
        y,
        x: x.split(' ')[0],
      };
    });

    return [
      {
        id: label,
        data: parsedData,
      },
    ];
  }, [data, label]);

  const minYValue = useMemo(() => {
    return Math.min(...data.map(({ y }) => Number(y)));
  }, [data]);

  return (
    <Paper style={{ height: 'calc(100vh - 248px)', margin: 20 }}>
      {loading ? (
        <Loading />
      ) : (
        <ResponsiveLine
          data={normalizedData}
          margin={{
            top: 20,
            right: 20,
            bottom: 65,
            left: 55,
          }}
          xScale={{
            type: 'point',
          }}
          yScale={{
            type: 'linear',
            stacked: false,
            min: 'auto',
            max: 'auto',
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
          }}
          curve="monotoneX"
          colors={{
            scheme: colorScheme,
          }}
          enableArea
          areaBaselineValue={minYValue}
          areaOpacity={0.1}
          lineWidth={5}
          enablePoints
          pointSize={10}
          enableSlices="x"
          animate
          theme={{
            fontSize: 14,
          }}
          defs={[
            patternLinesDef('lines-pattern', {
              color: 'inherit',
              spacing: 4,
              rotation: -45,
              lineWidth: 3,
            }),
          ]}
          fill={[{ match: { id: label }, id: 'lines-pattern' }]}
        />
      )}
    </Paper>
  );
};

export default VizualizationTab;

VizualizationTab.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.string.isRequired,
      y: PropTypes.string.isRequired,
    }),
  ).isRequired,
  label: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

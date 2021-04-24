import React from 'react';
import { ResponsiveBubble } from '@nivo/circle-packing';

const StatisticItem = ({ value, colorScheme }) => {
  return (
    <ResponsiveBubble
      root={{
        value,
      }}
      margin={{ right: 10, left: 10, top: 10, bottom: 10 }}
      identity="value"
      value="value"
      colors={{ scheme: colorScheme }}
      padding={6}
      labelTextColor="#000"
      borderWidth={4}
      borderColor={{
        from: 'color',
        modifiers: [
          ['darker', 0.6],
          ['opacity', 0.5],
        ],
      }}
      animate
      motionStiffness={90}
      motionDamping={12}
      theme={{
        fontSize: '1.5rem',
        textColor: '#fff',
      }}
      isInteractive={false}
    />
  );
};

export default StatisticItem;

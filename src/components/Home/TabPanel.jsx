import React from 'react';
import PropTypes from 'prop-types';

const TabPanel = ({ value, index, children, ...rest }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...rest}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

export default TabPanel;

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

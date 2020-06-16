import '../../Styles/User.css';
import React from 'react';

const DataContainerProfile = ({ view, title }) => {
  return (
    <div className="container-settings">
      <div className="container-title">
        <h1>
          { title }
        </h1>
      </div>
      { view() }
    </div>
  );
}

export default DataContainerProfile;
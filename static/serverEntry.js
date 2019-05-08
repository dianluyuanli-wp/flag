import React from 'react';
import Flag from '../component/flag';
import FlagContext from '../component/flag/context';
import network from '../utils/network';
import tools from '../utils/tools';
import getDataMap from '../routes/getData';

const renderFunction = (data, url) => {
    return (
        <FlagContext.Provider value={data}>
            <Flag url={url}/>
        </FlagContext.Provider>
    )
        
}
export {network};
export {tools};
export {getDataMap};
export default renderFunction;

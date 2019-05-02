import React from 'react';
import Flag from '../component/flag';
import FlagContext from '../component/flag/context';
import network from '../utils/network';

const renderFunction = (data, url) => {
    return (
        <FlagContext.Provider value={data}>
            <Flag url={url}/>
        </FlagContext.Provider>
    )
        
}
export {network};
export default renderFunction;

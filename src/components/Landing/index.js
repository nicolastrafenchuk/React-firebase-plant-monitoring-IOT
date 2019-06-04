import React from 'react';
import TypoGraphy from '@material-ui/core/Typography';
import ReactPlayer from 'react-player'
import gif from '../../img/back.gif'

//<img src={ require('../../img/img_tree.png') } alt="tree" style={{height: 550}}/>


const Landing = () => (

    <div>
        <div>
            <img src={gif} alt="plant" 
                style={{
                    position: 'fixed',
                    right: 0,
                    bottom: 0,
                    minHeight: '75%',
                    minWidth: '75%'  
                }}
            />
        </div>
            
            <div style={{textAlign: "center", color: '#000', padding: '70px, 0', margin: 'auto', position: 'absolute',width: '100%'}}> 
                <TypoGraphy variant='h3'>
                    <h2>Plant monitoring and care app</h2>
                    <p>Please, log in to see all stuff</p>
                </TypoGraphy>
            </div>
   </div>          
    
);



export default Landing;
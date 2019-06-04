import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { ResponsiveLine } from '@nivo/line';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List'
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Button } from '@material-ui/core';
import { withAutorization } from '../Session';
import { compose } from 'recompose';

const condition = authUser => !!authUser;


function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}

class HomeCom extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            humidity: [],
            temperature: [],
            pressure: [],
            humidity_g: [],
            value: 0,
            selectedDate: new Date(),
            selectedDateStart: new Date(Date.now() - 10800000),
        };
        
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
        console.log(this.state.selectedDate)
    };

    handleDateChangeStart = (date) => {
        this.setState({ selectedDateStart: date });
        console.log(this.state.selectedDateStart)
    };

    getDate = () => {
        let dataT = [];
        this.props.firebase.temperature().orderBy("dateAndTime", "desc").where('dateAndTime', '>=', this.state.selectedDateStart).where('dateAndTime', '<=', this.state.selectedDate).get().then((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
                console.log(documentSnapshot.data().dateAndTime.toDate());
                let check;
                let obj;
                check = documentSnapshot.data();
                obj = {'x': `${check.dateAndTime.toDate().toLocaleTimeString()} Day: ${check.dateAndTime.toDate().toLocaleDateString()}`, 'y': check.temperature.toFixed(4)};
                console.log(obj); 
                dataT.unshift(obj);
            })
        this.setState({temperature: dataT});
        });
    }
    
    componentDidMount() {
        let dataH = [];
        let dataT = [];
        let dataP = [];
        let dataHG = [];
        this.props.firebase.humidity().orderBy("dateAndTime", "desc").limit(12).get().then((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
                let check;
                let obj;
                check = documentSnapshot.data();
                obj = {'x': `${check.dateAndTime.toDate().toLocaleTimeString()} Day: ${check.dateAndTime.toDate().toLocaleDateString()}`, 'y': check.humidity.toFixed(4)};
                console.log(obj); 
                dataH.unshift(obj);
            })
         this.setState({humidity: dataH});
        });
        this.props.firebase.temperature().orderBy("dateAndTime", "desc").limit(12).get().then((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
                let check;
                let obj;
                check = documentSnapshot.data();
                obj = {'x': `${check.dateAndTime.toDate().toLocaleTimeString()} Day: ${check.dateAndTime.toDate().toLocaleDateString()}`, 'y': check.temperature.toFixed(4)};
                console.log(obj); 
                dataT.unshift(obj);
            })
         this.setState({temperature: dataT});
        });
        this.props.firebase.pressure().orderBy("dateAndTime", "desc").limit(12).get().then((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
                let check;
                let obj;
                check = documentSnapshot.data();
                obj = {'x': `${check.dateAndTime.toDate().toLocaleTimeString()} Day: ${check.dateAndTime.toDate().toLocaleDateString()}`, 'y': check.pressure.toFixed(4)};
                console.log(obj); 
                dataP.unshift(obj);
            })
         this.setState({pressure: dataP});
        });
        this.props.firebase.humidity_g().orderBy("dateAndTime", "desc").limit(12).get().then((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
                let check;
                let obj;
                check = documentSnapshot.data();
                obj = {'x': `${check.dateAndTime.toDate().toLocaleTimeString()} Day: ${check.dateAndTime.toDate().toLocaleDateString()}`, 'y': check.humidity.toFixed(4)};
                console.log(obj); 
                dataHG.unshift(obj);
            })
         this.setState({humidity_g: dataHG});
        });
    }
    

    render(){
        
        const { value, selectedDate, selectedDateStart } = this.state;

        return(
           
            <div>
                <Tabs value={value} onChange={this.handleChange} variant="fullWidth" indicatorColor="secondary">
                    <Tab label="Temperature" />
                    <Tab label="Humidity" />
                    <Tab label="Moisture" />
                    <Tab label="Pressure" />
                </Tabs>
                {value === 0 && <TabContainer>
                    <Paper> 
                        <div style={{ height: 530 }}>
                        <ResponsiveLine data={
                                [
                                    {
                                        "id": "Temperature",
                                        "color": "hsl(205, 70%, 50%)",
                                        data: this.state.temperature,
                                        fontSize: 20
                                    }
                                ]
                            }
                            margin={{
                                "top": 10,
                                "right": 50,
                                "bottom": 0,
                                "left": 50
                            }}              
                            xScale={{
                                "type": "point"
                            }}
                            yScale={{
                                "type": "linear",
                                "stacked": false,
                                "min": "auto",
                                "max": "auto"
                            }}
                            
                            curve="monotoneX"
                            colors={{
                                "scheme": "set1"
                            }}
                            enableDots={false}
                            enableArea={true}
                            dotSize={10}
                            lineWidth={5}
                            dotColor={{
                                "theme": "background"
                            }}
                            dotBorderWidth={2}
                            dotBorderColor={{
                                "from": "color"
                            }}
                            tooltip = {slice => (
                                <div style={{ color: '#000' }}>
                                <div>{`Time: ${slice.id}`}</div>
                                {slice.data.map(d => (
                                    <div
                                    key={d.serie.id}
                                    style={{
                                        padding: '3px 0',
                                        color: '#000'
                                    }}
                                    >
                                    <strong>{d.serie.id}: </strong> {d.data.y}°C 🌡
                                    </div>
                                ))}
                                </div>
                            )}
                            enableDotLabel={false}
                            dotLabel="y"
                            dotLabelYOffset={-12}
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                            areaOpacity={0.1}
                            enableGridX={false}
                            
                            
                        
                        />
                        </div>
                    </Paper>
                </TabContainer>}
                {value === 1 && <TabContainer>
                    <Paper style={{ margin: 10 }}>
                        <div style={{ height: 530 }}>
                            <ResponsiveLine data={
                                [
                                    {
                                    "id": "Humidity, 💧 %Rh",
                                    "color": "hsl(205, 70%, 50%)",
                                    data: this.state.humidity
                                    }
                                ]
                            }

                                margin={{
                                    "top": 50,
                                    "right": 140,
                                    "bottom": 0,
                                    "left": 50
                                }}
                                                
                                xScale={{
                                    "type": "point"
                                }}
                                yScale={{
                                    "type": "linear",
                                    "stacked": false,
                                    "min": "auto",
                                    "max": "auto"
                                }}
                                
                                curve="monotoneX"
                                colors={{
                                    "scheme": "paired"
                                }}
                                enableDots={false}
                                enableArea={true}
                                dotSize={10}
                                lineWidth={5}
                                dotColor={{
                                    "theme": "background"
                                }}
                                dotBorderWidth={2}
                                dotBorderColor={{
                                    "from": "color"
                                }}
                                tooltip = {slice => (
                                    <div style={{ color: '#000' }}>
                                    <div>{`Time: ${slice.id}`}</div>
                                    {slice.data.map(d => (
                                        <div
                                        key={d.serie.id}
                                        style={{
                                            padding: '3px 0',
                                            color: '#000'
                                        }}
                                        >
                                        <strong>{d.serie.id}</strong> [{d.data.y}]
                                        </div>
                                    ))}
                                    </div>
                                )}
                                enableDotLabel={false}
                                dotLabel="y"
                                dotLabelYOffset={-12}
                                animate={true}
                                motionStiffness={90}
                                motionDamping={15}
                                areaOpacity={0.1}
                                enableGridX={false}

                                legends={[
                                    {
                                        "anchor": "right",
                                        "direction": "column",
                                        "justify": false,
                                        "translateX": 100,
                                        "translateY": 0,
                                        "itemsSpacing": 0,
                                        "itemDirection": "left-to-right",
                                        "itemWidth": 80,
                                        "itemHeight": 20,
                                        "itemOpacity": 0.75,
                                        "symbolSize": 12,
                                        "symbolShape": "circle",
                                        "symbolBorderColor": "rgba(0, 0, 0, .5)",
                                        "font-size": "20px",
                                        "effects": [
                                            {
                                                "on": "hover",
                                                "style": {
                                                    "itemBackground": "rgba(0, 0, 0, .03)",
                                                    "itemOpacity": 1
                                                }
                                            }
                                        ]
                                    }
                                ]}
                            />
                        </div>
                    </Paper>
                </TabContainer>}
                {value === 2 && <TabContainer>
                    <Paper style={{ margin: 10 }}>
                        <div style={{ height: 530 }}>
                            <ResponsiveLine data={
                                    [
                                        {
                                        "id": "Moisture, 💧 %Rh",
                                        "color": "hsl(205, 70%, 50%)",
                                        data: this.state.humidity_g
                                        }
                                    ]
                                }

                                margin={{
                                    "top": 50,
                                    "right": 140,
                                    "bottom": 0,
                                    "left": 50
                                }}
                                                
                                xScale={{
                                    "type": "point"
                                }}
                                yScale={{
                                    "type": "linear",
                                    "stacked": false,
                                    "min": "auto",
                                    "max": "auto"
                                }}
                                curve="monotoneX"
                                colors={{
                                    "scheme": "set2"
                                }}
                                enableDots={false}
                                enableArea={true}
                                dotSize={10}
                                lineWidth={5}
                                dotColor={{
                                    "theme": "background"
                                }}
                                dotBorderWidth={2}
                                dotBorderColor={{
                                    "from": "color"
                                }}
                                tooltip = {slice => (
                                    <div style={{ color: '#000' }}>
                                    <div>{`Time: ${slice.id}`}</div>
                                    {slice.data.map(d => (
                                        <div
                                        key={d.serie.id}
                                        style={{
                                            padding: '3px 0',
                                            color: '#000'
                                        }}
                                        >
                                        <strong>{d.serie.id}</strong> [{d.data.y}]
                                        </div>
                                    ))}
                                    </div>
                                )}
                                enableDotLabel={false}
                                dotLabel="y"
                                dotLabelYOffset={-12}
                                animate={true}
                                motionStiffness={90}
                                motionDamping={15}
                                areaOpacity={0.1}
                                enableGridX={false}

                                legends={[
                                    {
                                        "anchor": "right",
                                        "direction": "column",
                                        "justify": false,
                                        "translateX": 100,
                                        "translateY": 0,
                                        "itemsSpacing": 0,
                                        "itemDirection": "left-to-right",
                                        "itemWidth": 80,
                                        "itemHeight": 20,
                                        "itemOpacity": 0.75,
                                        "symbolSize": 12,
                                        "symbolShape": "circle",
                                        "symbolBorderColor": "rgba(0, 0, 0, .5)",
                                        "effects": [
                                            {
                                                "on": "hover",
                                                "style": {
                                                    "itemBackground": "rgba(0, 0, 0, .03)",
                                                    "itemOpacity": 1
                                                }
                                            }
                                        ]
                                    }
                                ]}
                            />
                        </div>
                    </Paper>
                </TabContainer>}
                {value === 3 && <TabContainer>
                    <Paper style={{ margin: 10 }}>
                        <div style={{ height: 530 }}>
                            <ResponsiveLine style={{fontSize: 20}}data={
                                    [
                                        {
                                        "id": "Pressure, hPa",
                                        "color": "hsl(205, 70%, 50%)",
                                        data: this.state.pressure
                                        }
                                    ]
                                }

                                margin={{
                                    "top": 50,
                                    "right": 140,
                                    "bottom": 0,
                                    "left": 50
                                }}
                                                
                                xScale={{
                                    "type": "point"
                                }}
                                yScale={{
                                    "type": "linear",
                                    "stacked": false,
                                    "min": "auto",
                                    "max": "auto"
                                }}
                                
                                curve="monotoneX"
                                colors={{
                                    "scheme": "nivo"
                                }}
                                enableDots={false}
                                enableArea={true}
                                dotSize={10}
                                lineWidth={5}
                                dotColor={{
                                    "theme": "background"
                                }}
                                dotBorderWidth={2}
                                dotBorderColor={{
                                    "from": "color"
                                }}
                                tooltip = {slice => (
                                    <div style={{ color: '#000' }}>
                                    <div>{`Time: ${slice.id}`}</div>
                                    {slice.data.map(d => (
                                        <div
                                        key={d.serie.id}
                                        style={{
                                            padding: '3px 0',
                                            color: '#000'
                                        }}
                                        >
                                        <strong>{d.serie.id}</strong> [{ d.data.y}]
                                        </div>
                                    ))}
                                    </div>
                                )}
                                enableDotLabel={false}
                                dotLabel="y"
                                dotLabelYOffset={-12}
                                animate={true}
                                motionStiffness={90}
                                motionDamping={15}
                                areaOpacity={0.1}
                                enableGridX={false}

                                legends={[
                                    {
                                        "anchor": "right",
                                        "direction": "column",
                                        "justify": false,
                                        "translateX": 100,
                                        "translateY": 0,
                                        "itemsSpacing": 0,
                                        "itemDirection": "left-to-right",
                                        "itemWidth": 80,
                                        "itemHeight": 20,
                                        "itemOpacity": 0.75,
                                        "symbolSize": 12,
                                        "symbolShape": "circle",
                                        "symbolBorderColor": "rgba(0, 0, 0, .5)",
                                        "effects": [
                                            {
                                                "on": "hover",
                                                "style": {
                                                    "itemBackground": "rgba(0, 0, 0, .03)",
                                                    "itemOpacity": 1
                                                }
                                            }
                                        ]
                                    }
                                ]}
                            />
                        </div>
                    </Paper>
                </TabContainer>}
                <Paper style={{ paddingTop: 20, paddingBottom: 20, marginLeft: 25, marginRight: 25, textAlign: 'center'}}>
                    <Typography display='inline' variant='subtitle1'>Now showing period </Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Typography display='inline' variant='subtitle1'>from:</Typography>
                        <DateTimePicker color='inherit' ampm={false} showTodayButton value={selectedDateStart} onChange={this.handleDateChangeStart} style={{marginLeft: 15, marginRight: 15}} />
                        <Typography display='inline' variant='subtitle1'>to:</Typography>
                        <DateTimePicker ampm={false} showTodayButton value={selectedDate} onChange={this.handleDateChange} style={{marginLeft: 15, marginRight: 15}}/>
                    </MuiPickersUtilsProvider>
                    <Button onClick={this.getDate}>Set period</Button>
                </Paper>
            </div>
                
        );
    }
}

const Home = compose(
    withAutorization(condition),
    withFirebase,
)(HomeCom);

export default Home

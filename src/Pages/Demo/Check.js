import React from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import BarChart from 'react-bar-chart';
import '../../main.css';
import { ColorRing } from 'react-loader-spinner';

export default function Check() {
    const location = useLocation();
    const dataset = location.state;

    const [results, setResults] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [metrics, setMetrics] = React.useState([]);

    React.useEffect(() => {
        setMetrics([
            {
                "name":"balance",
                "description":"Minimum ratio between protected group members in a cluster and protected group members in the data set, measured over all groups and clusters. Its value lies between 0 and 1. By 0 means unfair and 1 means fair."
                
            },
            {
                "name":"kcenter cost",
                "description":"Maximum of the minimum distance between any data point to the cluster center. Lower cost leads to more fairness."
                
            },
            {
                "name":"kmeans cost",
                "description":"Sum of the minimum of the distances squared to the cluster centers. Lower cost leads to high fairness."
                
            },
            {
               "name":"kmedian cost",
               "description":"Sum of the minimum of the distances to the cluster centers. Lower cost leads to high fairness."
               
           },
           {
               "name":"proportionality (rho)",
               "description":"For n samples and k clusters, any n/k points are entitled to form their own cluster if there is another center that is closer in distance for all n/k points. Higher proportionality leads to high fairness."
               
           }  
       ])
    },[])

    React.useEffect(() => {

        if(dataset.name=="bank") {
            setResults([{"name":"balance", "value":"0.1"},
                    {"name":"kcenter cost", "value":"1990"}])
            setTimeout(() => setLoading(false), 2000);
        }   
        else if(dataset.name=="census") {
            setResults([{"name":"balance", "value":"0.1"},
                    {"name":"kcenter cost", "value":"1990"}])
            setTimeout(() => setLoading(false), 2000);
        }
        else if(dataset.name=="diabetes full") {
            setResults([{"name":"balance", "value":"0.1"},
                    {"name":"kcenter cost", "value":"1990"}])
            setTimeout(() => setLoading(false), 2000);
        }
        else if(dataset.name=="diabetes") {
            setResults([{"name":"kmeans cost", "value":"6070"},
                    {"name":"proportionality (rho)", "value":"1.01"}])
            setTimeout(() => setLoading(false), 2000);
        }
        else if(dataset.name=="iris") {
            setResults([{"name":"kmeans cost", "value":"6070"},
                    {"name":"proportionality (rho)", "value":"1.01"}])
            setTimeout(() => setLoading(false), 2000);
        }
        
    },[])

    const margin = {top: 20, right: 20, bottom: 30, left: 40};

    return (
        <>
        <div style={{background:"#f8f1ea", padding: "20px"}}>
        <div className="title"><h6>Fair Clustering - Demo</h6></div>
        <div class="stepper-wrapper " >
        <div class="progrow">
        <div class="stepper-item completed">
            <div class="step-counter">1</div>
            <div class="step-name">Data</div>
        </div>
        <div class="stepper-item stepactive">
            <div class="step-counter">2</div>
            <div class="step-name">Check</div>
        </div>
        <div class="stepper-item ">
            <div class="step-counter">3</div>
            <div class="step-name">Mitigate</div>
        </div>
        <div class="stepper-item">
            <div class="step-counter">4</div>
            <div class="step-name">Compare</div>
        </div>
        </div>
        <div className="backnext" align="right">
        <Link to="/demo" state={dataset}><Button color='primary'>Back</Button></Link>
        <Link to="/demo/mitigate" state={{data:dataset, algo:null}} className="backnext"><Button color='primary'>Next</Button></Link>
        </div>
        </div>
        </div>
       
            <div style={{padding: "20px", width:"70%"}}>
            <b>2. Check bias metrics</b>
            <br/>
            {loading ? 
            <div>
            <ColorRing height="40" width="40" className="loading"/>
            <div style={{marginLeft: "25px"}} className="loading">Checking for bias</div>
            </div>
            :
            <>
            <div style={{marginLeft: "25px"}}>
            Dataset: {dataset.name}
            <br />
            Mitigation: none
            </div>
            <div style={{paddingLeft: 30, marginTop: 30}}>
                {
                    results && results.map(res => {
                        return(
                            <>
                            <b>{res.name}</b>
                            <br/>
                            {
                                metrics && metrics.filter(met => {
                                    return res.name === met.name    
                                }).map(met => {
                                    return met.description
                                })
                            }
                            <br/>
                            <BarChart width={190} height={180} margin={margin} data={[{text: 'Unfair', value: res.value}]} />
                            <br/>
                            The calculated value is {res.value}
                            <br/>
                            <br/>
                            </>
                        )
                    }) 
                }
            </div>
            </>
            }
            </div>
            
        </>
    ) 
}
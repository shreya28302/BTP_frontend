import React from 'react';
import { Button } from 'react-bootstrap';
import { Radio, RadioGroup} from 'react-radio-group'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import '../../main.css';

export default function Data() {
    const location = useLocation();
    let dataset = location.state;
    if (dataset === null) {
        dataset = {
            "name":"",
            "description":"",
            "type":"",
            "protectedAttributes":[]
        }
    }

    const [datasets, setDatasets] = React.useState([]);
    const [selectedDataset, setSelectedDataset] = React.useState(dataset);

    React.useEffect(() => {
        setDatasets([
            {
                "name":"bank",
                "description":"The data is about marketing campaigns of a Portuguese bank. The campaigns were based on phone calls. Often, more than one contact to the same client was required, in order to access if the product (bank term deposit) would be ('yes') or not ('no') subscribed. ",
                "type":"binary",
                "protectedAttributes":[
                    {
                        "attributeName":"marital",
                        "privileged":"married",
                        "unprivileged":"unmarried"
                    },
                    {
                        "attributeName":"gender",
                        "privileged":"female",
                        "unprivileged":"male"
                    }
                ]
            },
            {
                "name":"census",
                "type":"binary",
                "description":"This is 1994 Census data. A set of reasonably clean records was extracted using the following conditions: ((AAGE>16) && (AGI>100) && (AFNLWGT>1)&& (HRSWK>0)). Prediction task is to determine whether a person makes over 50K a year.",
                "protectedAttributes":[
                    {
                        "attributeName":"gender",
                        "privileged":"female",
                        "unprivileged":"male"
                    }
                ]
            },
            {
                "name":"diabetes full",
                "description":"The data set represents 10 years (1999-2008) of clinical care at 130 US hospitals. It has over 50 features representing patient and hospital outcomes. Helps to figure out situations where a patient will not be readmitted, or if their are going to be readmitted in less than 30 days ",
                "type":"binary",
                "protectedAttributes":[
                    {
                        "attributeName":"gender",
                        "privileged":"female",
                        "unprivileged":"male"
                    }
                ]
            } ,
            {
                "name":"iris",
                "description":"The datasets consists of three iris species with 50 samples each as well as some properties about each flower. One flower species is linearly separable from the other two, but the other two are not linearly separable from each other.",
                "type":"nonbinary"
            } ,
            {
                "name":"diabetes",
                "description":"The datasets consists of several medical predictor variables and one target variable, Outcome. Predictor variables includes the number of pregnancies the patient has had, their BMI, insulin level, age, and so on.",
                "type":"nonbinary"
            } 
        ])
    },[])

    const handleOnChange = (e) => {
        const datasetName = e
        datasets && datasets.map(data => {
            if (data.name === datasetName)
                setSelectedDataset(data)
        })
    }

    return (
        <> 
        {/* #fce2c4 */}
        <div style={{background:"#f8f1ea", padding: "20px"}}>
        <div className="title"><h6>Fair Clustering - Demo</h6></div>
        <div className="stepper-wrapper " >
        <div className="progrow">
        <div className="stepper-item stepactive">
            <div className="step-counter">1</div>
            <div className="step-name">Data</div>
        </div>
        <div className="stepper-item">
            <div className="step-counter">2</div>
            <div className="step-name">Check</div>
        </div>
        <div className="stepper-item ">
            <div className="step-counter">3</div>
            <div className="step-name">Mitigate</div>
        </div>
        <div className="stepper-item">
            <div className="step-counter">4</div>
            <div className="step-name">Compare</div>
        </div>
        </div>
        <div align="right">
                {selectedDataset.name ? <Link to="/demo/check" state={selectedDataset}><Button color='primary'>Next</Button></Link> : <Button color='primary' disabled={true}>Next</Button> }
                </div>
        </div>
        </div>
           
            
         
            <div style={{padding: "20px", width:"70%"}}>
            <b>1. Choose sample data set</b>
            <br/>
            <RadioGroup onChange={(e) => handleOnChange(e)}>
            { 
                datasets && datasets.map(data => {
                    return (
                        <div key={data.name} className="radio-button-background">
                            <Radio key={data.name} value={data.name} className="radio-button" checked={data.name === selectedDataset.name} style={{marginRight: "10px"}}/><b>{data.name}</b>
                            <div style={{marginLeft: "25px"}}>
                            type - {data.type}
                            <br/>
                            description - {data.description}
                            <br/>
                            {data.type === "binary" ? 
                            <>
                            Protected Attributes
                            <br/>
                            { 
                                data.protectedAttributes && data.protectedAttributes.map((att,i) => {
                                    return (
                                        <div key={att.attributeName}>
                                        {i+1}. {att.attributeName}, privileged - {att.privileged}, unprivileged - {att.unprivileged} 
                                        <br/>
                                        </div>
                                    )
                                })
                            }
                            </>
                            : null}
                            
                            <br/>
                            </div>
                        </div>
                    )
                })
            }
            </RadioGroup>
            </div>
        </>
    ) 
}
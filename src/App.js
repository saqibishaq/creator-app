import React,{Component} from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import Button from '@material-ui/core/Button';
import Modal from './components/modal/Modal';
import './App.css';

class App extends Component {

  state = {
    names:[],
    selectedName: '',
    selectedNameID: null,
    openModal: false,
    disable: true,
    alerts: [],
    alertData: {}
  }
  componentDidMount () {
    
    this.getAlerts();
    this.getNames();
    
    
  }

 getNames = () => {
  const queryString = this.props.location.search;
  const urlParams = new URLSearchParams(queryString);
  const companyName = urlParams.get('name');
  console.log(companyName);
   this.setState({selectedName: companyName});
    Axios.get('https://creator-api.herokuapp.com/names').then(res => {
      this.setState({names: res.data},() => console.log('names',this.state.names));
    }).catch(err => console.log(err));

  }
 getAlerts = () => {
   
    Axios.get('https://creator-api.herokuapp.com/alerts').then(res => {
      this.setState({alerts: res.data.data},() => this.companyDataHandler());

    }).catch(err => console.log(err));
    
  }
  companyDataHandler = () => {
    const name = this.state.selectedName;
    const alerts = this.state.alerts;
    let newAlerts = {};
    console.log(alerts);
    if(this.state.alerts.length !== 0 ){
    alerts.forEach(al => {
      if(al.Company_Info_ID.display_value === name){
        console.log('al',al);
          newAlerts.name = al.Company_Info_ID.display_value;
          newAlerts.date = al.Alert_Date;
          newAlerts.aTitle = al.Alert_Title;
          newAlerts.expiry = al.Expiry_Date;
          newAlerts.template = al.Alert_Template; 

      }
    });
  
    this.setState({alertData: newAlerts}, () => console.log('alerts data', this.state.alertData));
  }
    if(name !== null){
    this.setState({openModal: true});
    }
  }
    // selectNameHandler = (e, value) => {
    // console.log('value', value);
    // if(value){
   
    // this.setState({selectedName: value.title, selectedNameID: value.id, disable : false}, () => {
    //   let alerts = this.state.alerts;
    //   let id = this.state.selectedNameID;
    //   let newAlerts = {};
      
    //   alerts.forEach(al => {
    //     if(al.Company_Info_ID.ID === id){
    //       newAlerts.name = al.Company_Info_ID.display_value;
    //       newAlerts.date = al.Alert_Date;
    //       newAlerts.aTitle = al.Alert_Title;
    //       newAlerts.expiry = al.Expiry_Date;
    //       newAlerts.template = al.Alert_Template;
    //   }
    //   });
      
    //   this.setState({alertData: newAlerts}, () => console.log('alerts data', this.state.alertData));

    //   console.log(this.state.selectedName);

    // });
//   // }
//   if(value === null){
//     this.setState({disable: true});
//   }
// }
// alertHandler = () => {
//   this.setState({openModal: true});

// }
// closeHandler = () => {
//   this.setState({openModal: false});
// }
  
   
  render(){

    if((this.state.openModal === true) && (this.state.selectedName !== '' || this.state.selectedName === null)){
      let data = this.state.alertData;
      return (<Modal 
                show={this.state.openModal} 
                close={this.closeHandler}    
                    >
                 <div className="Modal">   
                <h2> Company Alerts Detail </h2>
                <h3>Alert Title</h3>
                {data.aTitle !== ''? <p>{data.aTitle}</p>: <p>No record Found</p>}
                {/* <table className="Table">
                  <thead>
                  <tr><th>Company Name</th><th>Alert Title</th><th>Alert Template</th><th>Alert Date</th><th>Expiry Date</th></tr>
                  </thead>
                  <tbody>
                  { Object.entries(data).length !== 0 ?
                      <tr><td>{data.name}</td><td>{data.aTitle}</td><td>{data.template}</td><td>{data.date}</td><td>{data.expiry}</td></tr>:
                      <h3 style={{margin: '10px', padding: '10px' }}>No Record Found</h3>
                      }
                  </tbody> 
                </table> */}
                </div>
              </Modal>);

    }
    

  return (
    <div className="App">
      {/* {data} */}
     {/* <h2>Select A Company Name to Get Alerts</h2>
     <div className="Input">
      <Autocomplete
        id="controlled-demo"
        options={this.state.names}
        getOptionLabel={(option) => option.title}
        onChange={this.selectNameHandler}
        autoSelect={true}
        style={{ width: 300 , margin : 'auto'}}
        renderInput={(params) => <TextField {...params} label="Company Name" margin="normal" />}
    />
    </div>
    <div className="Button">
      <Button 
      onClick={this.alertHandler} 
      disabled={this.state.disable}
      variant="contained" 
      color="primary"
      >
        Show Alerts
      </Button>
      </div> */}
      
    </div>
  );
  }
}

export default withRouter(App);


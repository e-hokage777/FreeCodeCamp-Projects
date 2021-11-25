const padProperties = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

class DrumPad extends React.Component{
  constructor(props){
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
    this.display = this.display.bind(this);
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  handleClick(){
    this.playSound();
    this.display();
  }
  
  display(){
   this.props.sendClip(this.props.id); 
  }
  
  playSound(){
     let key = document.getElementById(this.props.keyTrigger)
     key.play();
  }
  
  handleKeyPress(key){
    if(key.keyCode == this.props.keyCode){
      this.playSound();
      this.display();
      
      let name = this.props.id;
      document.getElementById(name).classList.add('drum-pad-active');
      
      setTimeout(function(){document.getElementById(name).classList.remove('drum-pad-active')}, 100);
    }
  }
  
  componentDidMount(){
    document.addEventListener('keydown', this.handleKeyPress)
  }
  
  render(){
    return (<div id={this.props.id}
              className='drum-pad'
              onClick = {this.handleClick}>
        {this.props.keyTrigger}
        <audio 
          src={this.props.audioSrc}
          id = {this.props.keyTrigger}
          className='clip'>
        </audio>
           </div>);
  }
  
}

class PadPanel extends React.Component{
  constructor(props){
    super(props)
  }
  
  render(){
    let pads = padProperties.map(
      padProperty=>{
        return(
          <DrumPad
            keyCode = {padProperty.keyCode}
            keyTrigger = {padProperty.keyTrigger}
            id = {padProperty.id}
            audioSrc = {padProperty.url}
            sendClip = {this.props.sendClip}
            />
        );
      }
    );
    
    return (<div id='pad-panel'>
        {pads}
      </div>);
  }
}

class ControlPanel extends React.Component{
  constructor(props){
    super(props)
  }
  
  render(){
    return (
      <div id='control-panel'>
        <div id='drum-machine-header'>
          <i class='fas fa-drum'/>
          DRUM-MACHINE
            <i class='fas fa-drum'/>
        </div>
        <div id='display-wrapper'>
        <div id='display'>
          {this.props.audioClip}
        </div>
        </div>
        </div>)
  }
}

class DrumMachine extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      audioClip : 'BOOOOM'
    }
    
    this.getClip = this.getClip.bind(this);
  }
  
  getClip(clip){
    this.setState({
      audioClip : clip
    });
  }
  
  render(){
    return (
      <div id='drum-machine'>
        <PadPanel sendClip = {this.getClip}/>
        <ControlPanel audioClip={this.state.audioClip}/>
      </div>
      
    )
  }
}

ReactDOM.render(<DrumMachine/>, document.getElementById('root'))

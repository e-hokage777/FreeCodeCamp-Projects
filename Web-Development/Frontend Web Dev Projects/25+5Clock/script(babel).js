var timeout;
let minutes;
let seconds;

const defaultState = {
      breakLength : 5,
      sessionLength : 25,
      seconds : 1500,
      running : false,
      time : 25 + ":" + '00',
      timerState: 'Session'
}

class Timer extends React.Component{
  constructor(props){
    super(props);
    
    
  }
  
  
  render(){
    return (
            <div id='timer'>
        <p id='timer-label'>{this.props.timerState}</p>
          <div id='time-left'>
            {this.props.time}
          </div>
        <div id='start_stop-reset'>
          <button 
            class='button' 
            id='start_stop'
            onClick={this.props.startStop}
            >
            <i class="fas fa-play"></i>
            <i class="fas fa-pause"></i>
          </button>
          <button 
            class='button' 
            id='reset'
            onClick = {this.props.reset}
            >
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
        </div>
    )
  }
}

class BreakContainer extends React.Component {
  constructor(props){
    super(props);
    
    this.state= {
      increaseId: 'break-increment',
      decreaseId: 'break-decrement'
    }
    
}
    
  
  
  render(){
    return (
      <div id='break-container'>
            <p id='break-label'>Break Length</p>
            <div id='break-controls'>
            <button 
              class='btn-inc-dec'
              id={this.state.decreaseId}
              onClick = {this.props.decreaseBreakLength}
              >
                <i class="fas fa-caret-square-down"></i>
              </button>
            <div id='break-length'>
              {this.props.breakLength}
            </div>
            <button
              class='btn-inc-dec'
              id={this.state.increaseId}
              onClick = {this.props.increaseBreakLength}
              >
              <i class="fas fa-caret-square-up"></i>
            </button>
          </div>
        </div>
    )
  }
}

class SessionContainer extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
          <div id='session-container'>
        <p id='session-label'>Session Length</p>
              <div id='session-controls'>
                        <button 
                          class='btn-inc-dec'
              id='session-decrement'
                          onClick = {this.props.decreaseSessionLength}>
                <i class="fas fa-caret-square-down"></i>
              </button>
            <div id='session-length'>
              {this.props.sessionLength}
            </div>
            <button
              class='btn-inc-dec'
              id='session-increment'
              onClick = {this.props.increaseSessionLength}
              >
              <i class="fas fa-caret-square-up"></i>
            </button>
          </div>
        </div>
    );
  }
}

class Clock extends React.Component{
  constructor(props){
    super(props);
    
      this.state = {
      breakLength : 5,
      sessionLength : 25,
      seconds : 1500,
      running : false,
      time : 25 + ":" + '00',
      timerState : 'Session'
    }
    
    this.increaseBreakLength = this.increaseBreakLength.bind(this);
    this.decreaseBreakLength = this.decreaseBreakLength.bind(this);
    this.increaseSessionLength = this.increaseSessionLength.bind(this);
    this.decreaseSessionLength = this.decreaseSessionLength.bind(this);
    this.startStop = this.startStop.bind(this)
    this.countDown = this.countDown.bind(this);
    this.timeFormat = this.timeFormat.bind(this);
    this.reset = this.reset.bind(this);
  }
  
  //Changing break length functions
  increaseBreakLength(){
    if(this.state.breakLength < 60 && !this.state.running){
        this.setState({...this.state, breakLength: this.state.breakLength + 1});
    }
  }
  
  decreaseBreakLength(){
    if(this.state.breakLength > 1 && !this.state.running){
      this.setState({...this.state, breakLength: this.state.breakLength - 1});
    }
  }
  
  //changing session length functions
  increaseSessionLength(){
  if(this.state.sessionLength < 60 && !this.state.running){
     this.setState({...this.state, sessionLength: this.state.sessionLength + 1, minutes : this.state.sessionLength + 1, seconds : ((this.state.sessionLength+1)*60), time : this.state.sessionLength+1 + ":" + "00"});
  }
  }
  
  decreaseSessionLength(){
    if(this.state.sessionLength > 1 && !this.state.running){
      this.setState({...this.state, sessionLength: this.state.sessionLength - 1, minutess : this.state.sessionLength - 1, seconds : ((this.state.sessionLength-1)*60), time : this.state.sessionLength-1 + ":" + "00"});
    }
  }
  
  startStop(){
    if(!this.state.running){
      this.countDown();
      this.setState({...this.state, running : !this.state.running});
      }
    else{
      clearTimeout(timeout);
      this.setState({...this.state, running: !this.state.running})
    }
    
  }
  
  countDown(){
    this.setState({...this.state, seconds : this.state.seconds - 1});
       minutes = Math.floor(this.state.seconds/60);
       seconds = this.state.seconds-(minutes*60);
      this.timeFormat(minutes, seconds);
      timeout = setTimeout(() => {this.countDown()}, 1000)
      
  }
  
  timeFormat(mins, secs){
    if(minutes < 10){
      mins = '0'+mins
    }
    
    if(seconds < 10){
      secs = '0'+secs;
    }
    
    this.setState({...this.state, time: mins + ':' + secs})
    
    if(mins == '00' && secs == '00' && this.state.timerState == 'Session'){
      this.beep.play();
      this.setState({...this.state, seconds: this.state.seconds+1+this.state.breakLength*60, timerState: 'Break'});
    }
    
    else if(mins == '00' && secs == '00' && this.state.timerState == 'Break'){
      this.beep.play();
      this.setState({...this.state, seconds: this.state.seconds +1+ this.state.sessionLength*60, timerState : 'Session'})
    }
  }
  
  reset(){
    this.setState({...defaultState});
    clearTimeout(timeout);
    this.beep.pause();
    this.beep.currentTime = 0;
  }
  
  
  render(){
    return(
      <div id='clock'>
        <div id='break-and-session'>
          <BreakContainer 
            breakLength={this.state.breakLength}
            increaseBreakLength = {this.increaseBreakLength}
            decreaseBreakLength = {this.decreaseBreakLength}
            />
          <SessionContainer
            sessionLength={this.state.sessionLength}
            increaseSessionLength={this.increaseSessionLength}
            decreaseSessionLength = {this.decreaseSessionLength}
            />
        </div>
        <Timer 
          time={this.state.time}
          startStop = {this.startStop}
          reset = {this.reset}
          timerState = {this.state.timerState}
          />
        <audio
         src="https://od.lk/s/NjdfMjg3ODU0MTFf/25%2B5%20Clock.wav"
          preload = 'auto'
          id= 'beep'
          ref={(audio) => {
            this.beep = audio;}}
          >
          
        </audio>
      </div>
    )
  }
}

ReactDOM.render(<Clock/>, document.getElementById('root'));
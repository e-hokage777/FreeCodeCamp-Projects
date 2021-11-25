import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

const placeholder = `![Image](https://i.ibb.co/m5fGmRn/logo.jpg)
# Welcome
## This is my markdown previewer
#### Unordered List
 - one
 - two
 - three
 
#### Ordered List
1. four
1. five
1. six

\`System.out.println("inline code");\`

\`\`\`
//This is a code block
public static void main(String args[]){
System.out.println('THIS IS A BLOCK OF CODE');
}
\`\`\`

This is some **bolded** text.
and this is **more bolded text**.

####Quote of the previewer:
> "The ideal me is real"

Want some more quotes?
Click [here](https://codepen.io/e-hokage777/pen/oNeeYBY)
`;

const renderer = new marked.Renderer();

renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

class Editor extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      editorValue : placeholder
    }
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event){
 this.setState({
   editorValue : event.target.value
 });   this.props.sendMessage(event.target.value);
  }
  
  componentDidMount(){
    this.props.sendMessage(placeholder);
  }
  
  render(){
    return(
      <div id = 'editor-box'>
        <Toolbar title= "Editor"/>
      <textarea id='editor' onChange={this.handleChange} value={this.state.editorValue}>
        
      </textarea>
      </div>
    );
  }
}

class Previewer extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div id='previewer-box'>
        <Toolbar title="Preview"/>
      <div className='img-responsive' id='preview'
        dangerouslySetInnerHTML={{
            __html : marked(this.props.message, {renderer : renderer})
          }}> 
      </div>
      </div>
    );
  }
}

class Parent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text : ""
    }
    
    this.getMessage = this.getMessage.bind(this);
  }
  
  getMessage(message){
    this.setState({
      text : message
    });
  }
  
  render(){
    return(
      <div id= 'wrapper'>
        <Editor sendMessage = {this.getMessage}/>
        <Previewer message = {this.state.text}/>
      </div>
    )
  }
}

class Toolbar extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<div className="toolbar"><i className="fas fa-file-alt"></i>{this.props.title}</div>)
  }
}

ReactDOM.render(<Parent/>, document.getElementById('main'));

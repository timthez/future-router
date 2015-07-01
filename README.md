# Future Router
## Description
Intuitive Router built specifically for React-Flux. It allows reloading a page, backwards and forwards actions and defining routes in a separate module. Signaling a route change is very simple by either including Router.route('name_of_route',{args}) in a href attribute or invoking the action dynamically by doing Router.route(route_name,{args},true).
## Usage
The router is built upon the idea of keeping routing information in a separate module from the components and letting the router handle the transistions. The Router can be further factored out into 'sub router if it makes sense to do so'. We personally like having the Router be global but if the complexity of the routes requires locality it can be done easily. In the following code you would export the Router variable instead of assigning in globally.
1. Define your routes:
```javascript
    //Router.js
    //Global Router
    global.Router = require('future-router').Router;
    //Define Custom Routes
    Router.Routes = {

      toDumb: function(args){
        //This function can do whatever you want with the specified args which 
        //are a JSON but if you are changing a page we recommend using 
        //these functions
        //Pull in a component, or move this outside if you want a broader scope
        var About = require('./components/About.js');
        //Where the Components will be mounted to, can use another accessor if needed.
        var mount_point = document.getElementById('res');
        //Unmount 
        React.unmountComponentAtNode(mount_point);    
        //Mount new component and send in args as a prop or do processing of args.    
        React.render(<About data={args}/>, mount_point)); 
      },
      //Must exist, This is the primary entry point, you dont necessarily need to do anything here as it will load react normally.
      root: function(args){

      }
    };
```
2. Add the init Function to root of app. this is important as this allows reloading and shared links to be rendered correctly. *It is important that the Router.init() goes after the render.* 
```javascript
    var App = require('./components/app');
    //Dont need to assign to a var if using globally.
    require('./router.js');

    React.render (   
        <App id="app"/>,
      document.getElementById('main')
    );
    Router.init();
```
3. Use the Routes in your components:
```javascript
    var data = {json_stuff: "",more_stuff: ""};
    //In JSX with a href tag(The function returns a string making it easier to create a nice route quickly):
    <a  href={Router.route('route_name',data)}>
    //In an event handler
    handleClick(){
        //the last param signifies that you want the route to be immediately invoked, the function defaults to false to return a string that can be used in a href or something similar
        Router.route('route_name',data,true);
    }
    <button onClick={this.handlerClick}>Click Me</button>
```
## Dependencies
- jquery
- React(Optional but designed for it)
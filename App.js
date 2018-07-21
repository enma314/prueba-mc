/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

var Tree = function(value) {
  this.value = value;
  this.children = [];
}

Tree.prototype.addChild = function(value){
  this.children.push(new Tree(value))
}

Tree.prototype.insert = function(target, value){
  var inner = function(obj){
    if(obj.value == target){
      obj.addChild(value);
    }
    obj.children.forEach(function(child){
      inner(child);
    })
  }
  inner(this);
}


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      treeArray: ["Press Show Tree"],
      test: null,
      objTree: {},
      fatherInput: null,
      valueInput: null
    }
  }

  componentDidMount(){
    var myTree = new Tree("One Piece");
    myTree.addChild("Temp2");
    myTree.addChild("Temp3");
    myTree.children[0].addChild("OVA Temp2");
    myTree.children[0].children[0].addChild("OVA Temp2 Child");
    myTree.children[1].addChild("OVA Temp3");
    myTree.insert("Temp2", "OVA02 Temp2");
  
    this.setState({
      test: myTree.value,
      objTree: myTree
    });
    
  }

  handleButtonPress = () => {
    this.treeInsert(this.state.objTree, this.state.fatherInput, this.state.valueInput);
    this.treeDeploy(this.state.objTree);
  }; 

  addChild = (objTree, value) => {
    objTree.children.push(new Tree(value));
  }

  treeInsert = (objTree, target, value) => {
    self = this;
    var inner = function(obj){
      if(obj.value === target){
        self.addChild(obj, value);
      }
      obj.children.forEach(function(child){
        inner(child);
      })
    }
    inner(objTree);
  }

  treeDeploy = (obj) => {
    localTreeArray = [];
    var inner = function(objTree, string=""){
      string = string + "-";
      this.localTreeArray.push(string+objTree.value);
      objTree.children.forEach(function(child){
        inner(child, string);
      });
    };
    inner(obj)
    this.setState({
      treeArray: localTreeArray
    });
    
  };

  handleOnChangeFather = (text) => {
    this.setState({
      fatherInput: text
    })
  }

  handleOnChangeValue = (text) => {
    this.setState({
      valueInput: text
    })
  }

  renderRow = ({item}) => {
    return(
      <Text>{item.value}</Text>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>One Piece Tree</Text>
        <Text>Add to (father):</Text>
        <TextInput
          underlineColorAndroid = 'transparent'
          style={styles.textInput}
          onChangeText = {this.handleOnChangeFather}
        />
        <Text>Value to add: </Text>
        <TextInput
          underlineColorAndroid = 'transparent'
          style={styles.textInput}
          onChangeText = {this.handleOnChangeValue}
        />
        <View style={styles.buttonStyle}> 
          <Button
            onPress={ () => { this.handleButtonPress() } }
            color="green"
            title="Add to tree"
            
          />
        </View>  
        <View style={styles.buttonStyle}>  
          <Button
            onPress={ () => { this.treeDeploy(this.state.objTree) } }
            color="blue"
            title="Show tree"
            style={styles.buttonStyle}
          />
        </View>
        <FlatList
          data={this.state.treeArray}
          renderItem={({item}) => <Text style={ {color: 'black'} }>{item}</Text>}
          style={styles.flatList}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textInput: {
    height: 50,
    width: 200,
    borderWidth: 4,
    borderRadius: 20,
    borderColor: 'black',
    marginBottom: 10,
    marginHorizontal: 10
  },
  flatList: {
    width: '95%',
    borderColor: 'black',
    borderWidth: 4,
    flexDirection: 'row',
    marginBottom: 10
  },
  buttonStyle:{
    margin: 10
  },
  title:{
    color: 'black',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20
  }
});

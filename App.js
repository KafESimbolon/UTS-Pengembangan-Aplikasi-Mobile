import React from 'react';
import {StatusBar} from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class App extends React.Component{
  constructor(){
    super(); 
    this.state = {
      resultText:"",
      calculated:"",
    };
    this.operation = ['C','DEL', '+','-','*','/']
  }

  calculateResult(){
    const text = this.state.resultText
    console.log(text)
    this.setState({
      calculated: eval(text)
    })
  }

  validate(){
    const text = this.state.resultText
    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
      return false 
    }
    return true
  }

  buttonPressed(text){
    console.log(text)
    if (text == '=') {
      return this.validate() && this.calculateResult(this.state.resultText)
    }
    this.setState({
        resultText: this.state.resultText+text
    })
  }

  operate(operation){
    switch(operation){
      case 'DEL':
        let text = this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText: text.join('')
        })
        break
      case 'C':
        this.setState({
          resultText: '',
          calculated: ''
        });
        break
      case'+':
      case'-':
      case'*':
      case'/':
      const lastChar = this.state.resultText.split('').pop()
      if(this.operation.indexOf(lastChar)>0) return
      if(this.state.resultText == "") return
      this.setState({
        resultText: this.state.resultText+operation
      })
    }
  }

  render () {
    let rows = []
    let nums = [[1,2,3],[4,5,6],[7,8,9],['.',0,'=']]
    let ops = []
    for(let i=0;i<4;i++){
      let row = []
      for(let j=0;j<3;j++){
        row.push(
          <TouchableOpacity 
          key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={{
            flex: 1, 
            backgroundColor:'yellow',
            alignItems:'center', 
            alignSelf: 'stretch',
            borderWidth: 1,
            justifyContent: 'center',}}>
            <Text style={{
              color: 'black', 
              fontSize: 24,}}
              >{nums[i][j]}
            </Text>
          </TouchableOpacity>
        )
      }
      rows.push(
        <View key={i} style={{
          flexDirection: 'row', 
          flex: 1, 
          alignItems: 'center', 
          backgroundColor: 'green', 
          borderWidth: 1,}}
          >{row}
        </View>
      )
    }
    for(let i=0;i<6;i++){
      ops.push(
        <TouchableOpacity 
        key={this.operation[i]} style={{
          flex: 1, 
          alignItems:'center', 
          alignSelf: 'stretch', 
          borderWidth: 1,
          justifyContent: 'center',}} 
          onPress={() => this.operate(this.operation[i])}>
          <Text style={{
            color: 'white', 
            fontSize: 24,}}
            >{this.operation[i]}
          </Text>
        </TouchableOpacity>
      )
    }
    
    return (
      <View style={styles.container}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          backgroundColor: 'white',}}>
          <StatusBar backgroundColor="cyan" barStyle="light-content"/>
          <Text style={{
            fontSize: 24,
            color: 'black',}}
            >{this.state.resultText}
          </Text>
        </View>

        <View style={{
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'flex-end', 
          backgroundColor: 'white',}}>
          <Text style={{
            fontSize: 35,
            color: 'black',}}
            >{this.state.calculated}
          </Text>
        </View>

        <View style ={{
          flex: 7,
          flexDirection: 'row',}}>
          <View style={{
            flex: 3,}}
            >{rows}
          </View>
          <View style={{
            flexDirection: 'ops',
            flex: 1,
            justifyContent: 'space-around',
            backgroundColor: 'red',}}
            >{ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}
);
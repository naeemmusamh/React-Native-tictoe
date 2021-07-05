import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons'; 

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      gameState: [        
      [0, 0, 0,],
      [0, 0, 0,],
      [0, 0, 0,],],
      currentPlayer: 1,
    }
  }

  componentDidMount(){
    this.initializeGame();
  }

  initializeGame = ()=>{
    this.setState({gameState:
      [
        [0, 0, 0,],
        [0, 0, 0,],
        [0, 0, 0,],
      ],
      currentPlayer: 1,
    });
  }

  renderIcon = (row, col) =>{
    let value = this.state.gameState[row][col];
    switch(value){
      case 1: return  <Icon name='close' style={styles.tileX} />;
      case -1: return <Icon name='circle-outline' style={styles.tileO} />;
      default: return <View />;
    }
  }

  onTilePress = (row, col)=>{
    let currentPlayer = this.state.currentPlayer;

    //to don't the doable click change
    let value = this.state.gameState[row][col];
    if(value !== 0) {return;};

    //the first player
    let array = this.state.gameState.slice();
    array[row][col] = currentPlayer;
    this.setState({gameState: array});

    //the second player
    let nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    let winner = this.getWinner();
    if(winner == 1){
      Alert.alert('player one is the winner');
      this.initializeGame();
    }else if(winner == -1){
      Alert.alert('player 2 is the winner');
      this.initializeGame();
    }
  }

  getWinner = ()=>{
    let sum;
    let array = this.state.gameState;
    const num = 3;

    for(let x = 0; x < num; x++){
      sum = array[x][0] + array[x][1] + array[x][2];
      if(sum == 3){
        return 1;
      }else if(num == -3){
        return -1;
      }
    }

    for(let x = 0; x < num; x++){
      sum = array[0][x] + array[1][x] + array[2][x];
      if(sum == 3){
        return 1;
      }else if(sum == -3){
        return -1;
      }
    }

    sum = array[0][0] + array[1][1] + array[2][2];
    if(sum == 3){
      return 1;
    }else if(sum == -3){
      return -1;
    }

    sum = array[2][0] + array[1][1] + array[0][2];
    if(sum == 3){
      return 1;
    }else if(sum == -3){
      return -1;
    }

    return 0;
  }

  onNewGamePress = ()=>{
    this.initializeGame();
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=>this.onTilePress(0, 0)} style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0,}]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onTilePress(0, 1)} style={[styles.tile, {borderTopWidth: 0,}]} >
            {this.renderIcon(0, 1)}
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=>this.onTilePress(0, 2)} style={[styles.tile, {borderTopWidth: 0, borderRightWidth: 0,}]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=>this.onTilePress(1, 0)} style={[styles.tile, {borderLeftWidth: 0}]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onTilePress(1, 1)} style={styles.tile} >
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onTilePress(1, 2)} style={[styles.tile, {borderRightWidth: 0}]} >
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=>this.onTilePress(2, 0)} style={[styles.tile, {borderBottomWidth: 0, borderLeftWidth: 0,}]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onTilePress(2, 1)} style={[styles.tile, {borderBottomWidth: 0,}]}> 
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onTilePress(2, 2)} style={[styles.tile, {borderBottomWidth: 0, borderRightWidth: 0,}]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={{paddingTop: 50}} />
        <Button title=' New Game' onPress={this.onNewGamePress} />
        <View style={{paddingTop: 30}} />
        <Button title='   Reset    ' onPress={this.onNewGamePress} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile: {
    borderWidth: 1,
    width: 100,
    height: 100,
  },
  tileX: {
    color: 'red',
    fontSize: 100,
  },
  tileO: {
    color: 'green',
    fontSize: 100,
  },
});

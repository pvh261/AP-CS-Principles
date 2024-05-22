import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';

export default function App() {
  //declare variables
  const [name, nameHandler] = useState('')
  const [age, ageHandler] = useState()
  const [weight, weightHandler] = useState()
  const [height, heightHandler] = useState()
  const [bmi, bmiHandler] = useState()
  const [status, statusHandler] = useState('')
  const [users, usersHandler] = useState([])
  const [count, countHandler] = useState("Zero")

  //count the number of past results
  function displayCount(list) {
    let digits=['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
    let i = 0
    for(item of list) {
      i += 1
    }
    if(i<9) {
      return digits[i]
    } else {
      return i+1 //increment by 1 because useState is asynchronous
    }
  }

  //calculate BMI
  function calculateBMI() {
    let userBMI = Number(weight) / ((Number(height) / 100) ** 2)
    return userBMI.toFixed(2)
  }

  //identify status based on BMI
  function checkStatus(bmi) {
    if(bmi < 18.5) {
      return("Underweight")
    } else if(bmi < 24.9) {
      return("Healthy weight")
    } else if(bmi < 29.9) {
      return("Overweight")
    } else if(bmi < 34.9) {
      return("Obesity Class I")
    } else if(bmi < 39.9) {
      return("Obesity Class II")
    } else {
      return("Obesity Class III")
    }
  }

  //handle button press
  function buttonHandler() {
    let bmi = calculateBMI()
    let status = checkStatus(bmi)
    bmiHandler(bmi)
    statusHandler(status)
    usersHandler((currentUsers) => [{name: name, age: age, weight: weight, height: height, bmi: bmi, status: status}, ...currentUsers])//Add user (object) to list of results
    countHandler(displayCount(users))
  }

  //UI design
  return (
    <View style={styles.container}>
      <Text style={styles.title1}>BMI Calculator</Text>
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Name:</Text>
        <TextInput style={styles.inputBox} id="name" onChangeText={(input) => {nameHandler(input)}}></TextInput>
      </View>
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Age:</Text>
        <TextInput style={styles.inputBox} onChangeText={(input) => {ageHandler(Number(input))}}></TextInput>
      </View>
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Weight (kg):</Text>
        <TextInput style={styles.inputBox} onChangeText={(input) => {weightHandler(Number(input))}}></TextInput>
      </View>
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Height (cm):</Text>
        <TextInput style={styles.inputBox} onChangeText={(input) => {heightHandler(Number(input))}}></TextInput>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={buttonHandler}><Text style={styles.submitButtonText}>Calculate</Text></TouchableOpacity>
      <View style={styles.currentResultBox}>
        <Text style={styles.title2}>Your Result:</Text>
        <Text>Your BMI: {bmi}</Text>
        <Text>Your Status: {status}</Text>
      </View>
      <Text style={styles.title2}>List of Past Results</Text>
      <Text>{count} results</Text>
      <FlatList data={users} renderItem={(currentUsers) => {
        return (
          <View style={styles.pastResultBox}>
            <Text>User: {currentUsers.item.name} - {currentUsers.item.age} y.o. - {currentUsers.item.weight}kg - {currentUsers.item.height}cm</Text>
            <Text>BMI: {currentUsers.item.bmi} - Status: {currentUsers.item.status}</Text>
          </View>
        )}}></FlatList>
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title1: {
    fontSize: 50,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  input: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  inputLabel: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  inputBox: {
    flex: 2,
    width: 200,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 100,
    paddingLeft: 10,
  },
  submitButton: {
    height: 50,
    width: 100,
    backgroundColor: 'black',
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  title2: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  currentResultBox: {
    width: 300,
    alignItems: 'flex-start',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  pastResultBox: {
    width: 300,
    borderBottomWidth: 2,
  },
});

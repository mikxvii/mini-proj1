import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";

import { styles } from "../constants/Styles";
import { nameToPic } from "../constants/Constants";
import { useEffect } from "react";
import { shuffle } from "../utils/ArrayUtils";
const names = Object.keys(nameToPic);

export default function GameScreen() {
  // TODO: Declare and initialize state variables here, using "useState".
  const [numCorrect, setNumCorrect] = useState(0);         // State for the Score
  const [numAttempted, setNumAttempted] = useState(0);     // State for images attempted 
  const [currMemberName, setCurrMemberName] = useState(names[0]); // State for current MDB member name
  const [currMemberIMG, setCurrMemberIMG] = useState(nameToPic.riatao[1]);  // State for current MDB member img
  const [memberArray, setMemberArray] = useState([]);
  const [roundOver, setRoundOver] = useState(false);

  // State for the timer is handled for you.
  const [timeLeft, setTimeLeft] = useState(5000);

  // Called by the timer every 10 milliseconds
  const countDown = () => {
    if (timeLeft > 0) {
      // Time still left, so decrement time state variable
      setTimeLeft(timeLeft - 10);
    } else {
      // Time has expired (reached 0)
      // TODO: update appropriate state variables
      setRoundOver(true);
      setNumAttempted(numAttempted + 1)
    }
  };

  // This is used in the useEffect(...) hook bound on a specific STATE variable.
  // It updates state to present a new member & name options.
  const getNextRound = () => {
    // Fetches the next member name to guess.
    let correct = names[Math.floor(Math.random() * names.length)];
    let correctName = nameToPic[correct][0];
    let correctImage = nameToPic[correct][1];

    // Generate 3 more wrong answers.
    let nameOptions = [correctName];
    while (nameOptions.length < 4) {
      let wrong = names[Math.floor(Math.random() * names.length)];
      let wrongName = nameToPic[wrong][0];
      if (!nameOptions.includes(wrongName)) {
        nameOptions.push(wrongName);
      }
    }
    nameOptions = shuffle(nameOptions);
    // TODO: Update state here.
    setCurrMemberIMG(correctImage);
    setCurrMemberName(correctName);
    setMemberArray(nameOptions);
    setRoundOver(false);

    setTimeLeft(5000);
  };

  // Called when user taps a name option.
  // TODO: Update correct # and total # state values.
  const selectedNameChoice = (index) => {
    if (currMemberName == memberArray[index]) {
      setNumCorrect(numCorrect + 1);
    }
    setNumAttempted(numAttempted + 1);
    setRoundOver(true);
  };

  // Call the countDown() method every 10 milliseconds.
  useEffect(() => {
    const timer = setInterval(() => countDown(), 10);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  // TODO: Finish this useEffect() hook such that we automatically
  // get the next round when the appropriate state variable changes.
  useEffect(
    () => {
      getNextRound(); // Gets next round once timer reaches 0
    },
    [roundOver]
  );

  // Set up four name button components
  const nameButtons = [];
  for (let i = 0; i < 4; i++) {
    const j = i;
    nameButtons.push(
      // A button is just a Text component wrapped in a TouchableOpacity component.
      <TouchableOpacity
        key={j}
        style={styles.button}
        onPress={() => selectedNameChoice(j)}
      >
        <Text style={styles.buttonText}>
          {memberArray[j]}
        </Text>
      </TouchableOpacity>
    );
  }

  const timeRemainingStr = (timeLeft / 1000).toFixed(2);

  // Style & return the view.
  return (
    <View>
      <Text style={styles.scoreText}>
        Score: {numCorrect}/{numAttempted}
      </Text>
      <Text style={styles.timerText}>
        Time Remaining: {timeRemainingStr}
      </Text>
      <Image source = {currMemberIMG}
      style = {styles.image}></Image>
      {nameButtons}
    </View>
  );
}

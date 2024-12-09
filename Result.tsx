import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground,Image, } from "react-native";

const Results = ({
  score,
  restart,
  totalQuestions,
}: {
  score: number;
  restart: () => void;
  totalQuestions: number;
}) => {
  return (
    <ImageBackground
      source={require('@/assets/hehe.png')} // Update the image path if needed
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
      <View style={styles.wrapper}>
      {/* Replace "CONGRATS" text with an image */}
      <Image
        source={require('@/assets/conge.png')} // Replace with your "CONGRATS" image path
        style={styles.congratsImage}
      />

      {/* Replace "You scored:" text with an image */}
      <Image
        source={require('@/assets/sc.png')} // Replace with your "You scored" image path
        style={styles.scoreTextImage}
      />
          <Text style={styles.scoreValue}>
            {score}/{totalQuestions}
          </Text>

          <TouchableOpacity onPress={restart} activeOpacity={0.8} >
  <Image 
    source={require('@/assets/ert.png')} // Provide the path to your image
    style={styles.btnImage} // Style for the image
  />
</TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Results;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a darker overlay for better visibility
    padding: 20,
  },
  wrapper: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  scoreText: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "500",
  },
  scoreValue: {
    fontWeight: "700",
    fontSize: 28,
    color: "#004643",
  },
 
  
  
  btnImage: {
    width: 150, // Set a fixed width for the image
    height: 120, // Set a fixed height for the image
    resizeMode: 'contain', // Ensures the image fits within the given dimensions without distortion
  },
  congratsImage: {
    width: 250, // Adjust width as needed
    height: 60,  // Adjust height as needed
    marginBottom: 10,
  },
  scoreTextImage: {
    width: 230, // Adjust width as needed
    height: 50,  // Adjust height as needed
    marginBottom: 10,
  },
});

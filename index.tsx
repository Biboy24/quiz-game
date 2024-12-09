import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, 
  ImageBackground, Modal, Image, ScrollView, } from 'react-native';
import Option from '@/screen/Option';
import { useEffect, useState } from 'react';
import { quizData } from '@/screen/question';
import Results from '@/screen/Result';
import { Picker } from '@react-native-picker/picker';
import React from 'react';


export default function App() {
  const [questions, setQuestions] = useState<any>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [checkIfSelected, setCheckIfSelected] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });
  const [percentageComplete, setPercentageComplete] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [numQuestions, setNumQuestions] = useState(5);  // Default to 5 questions
  const [timeLeft, setTimeLeft] = useState(10); // Timer starts at 10 seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  useEffect(() => {
    // Filter quizData based on selected difficulty and number of questions
    const filteredQuestions = quizData.filter((q) => q.difficulty === difficulty);
    setQuestions(filteredQuestions.slice(0, numQuestions));
  }, [difficulty, numQuestions]);

  let currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    let percentage = ((currentQuestionIndex + 1) / questions?.length) * 100;
    setPercentageComplete(percentage);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (isTimerActive) {
      if (timeLeft > 0) {
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(timer);
      } else {
        handleNext(); // Automatically move to next question when time runs out
      }
    }
  }, [isTimerActive, timeLeft]);

  const handleNext = () => {
    let correctAnswer = questions[currentQuestionIndex]?.answer;

    if (selectedOption === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < questions?.length - 1) {
      setCurrentQuestionIndex((prevQuestion) => prevQuestion + 1);
      setTimeLeft(10); // Reset timer for next question
    } else {
      setShowResult(true);
    }

    setCheckIfSelected({
      option1: false,
      option2: false,
      option3: false,
      option4: false,
    });
  };
  useEffect(() => {
    // Utility function to shuffle an array
    const shuffleArray = (array: any[]) => {
      return array.sort(() => Math.random() - 0.5);
    };
    
  
    // Filter quizData based on selected difficulty
    const filteredQuestions = quizData.filter((q) => q.difficulty === difficulty);
  
    // Shuffle and limit the number of questions
    const shuffledQuestions = shuffleArray(filteredQuestions).slice(0, numQuestions);
  
    setQuestions(shuffledQuestions);
  }, [difficulty, numQuestions]);

  const checkOptionOne = () => {
    setCheckIfSelected({
      option1: true,
      option2: false,
      option3: false,
      option4: false,
    });
  };
  const [isCreatorModalVisible, setIsCreatorModalVisible] = useState(false);

  const checkOptionTwo = () => {
    setCheckIfSelected({
      option1: false,
      option2: true,
      option3: false,
      option4: false,
    });
  };

  const checkOptionThree = () => {
    setCheckIfSelected({
      option1: false,
      option2: false,
      option3: true,
      option4: false,
    });
  };

  const checkOptionFour = () => {
    setCheckIfSelected({
      option1: false,
      option2: false,
      option3: false,
      option4: true,
    });
  };

  const restart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setShowStartScreen(true);
    setTimeLeft(10); // Reset timer
  };

  if (showIntro) {
    return (
      <ImageBackground
        source={require('@/assets/hehe.png')} // Replace with your image path
        style={styles.introBackground}
      >
        <View style={styles.introWrapper}>
          <Text style={styles.introMessage}>
            Welcome to the Binoy Quiz!{'\n\n'}
            Get ready to test your knowledge across various exciting topics. This quiz will challenge your memory, wit, and problem-solving skills!{'\n\n'}
            Are you prepared to showcase your expertise and climb to the top of the leaderboard? Let's dive in and start the adventure!
          </Text>
          <Text style={styles.additionalText}>
            📜 **How to Play**{'\n'}
            - Select your desired difficulty level.{'\n'}
            - Choose the number of questions you'd like to answer.{'\n'}
            - Each question has a timer, so think quickly!{'\n'}
            - Aim for the highest score and have fun!{'\n\n'}
            🎉 **Pro Tip**: Stay focused and trust your instincts. Good luck!
          </Text>
          <TouchableOpacity
            onPress={() => setShowIntro(false)}
            style={styles.startButtonWrapper}
          >
            <Text style={styles.startButton}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
  
  if (showStartScreen) {
    function setShowCreatorModal(arg0: boolean): void {
      throw new Error('Function not implemented.');
    }
  
    return (
      <ImageBackground
        source={require('@/assets/hehe.png')} // Replace with your image path
        style={styles.backgroundImage}
      >
        <View style={styles.background}>
        
          <Image
            source={require('@/assets/BINOY.png')} // Replace with your "BINOY QUIZ" image
            style={styles.headingImage}
          />
    
          <View style={styles.selectorContainer}>
            <Image
              source={require('@/assets/dif.png')} // Replace with your "Select Difficulty" image
              style={styles.selectorTextImage}
            />
            <Picker selectedValue={difficulty} onValueChange={setDifficulty} style={styles.picker}>
              <Picker.Item label="Easy" value="easy" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Hard" value="hard" />
            </Picker>
    
            <Image
              source={require('@/assets/see.png')} // Replace with your "Select Number of Questions" image
              style={styles.selectorTextImage}
            />
            <Picker selectedValue={numQuestions} onValueChange={setNumQuestions} style={styles.picker}>
              <Picker.Item label="5" value={5} />
              <Picker.Item label="10" value={10} />
              <Picker.Item label="20" value={20} />
              <Picker.Item label="30" value={30} />
              <Picker.Item label="40" value={40} />
              <Picker.Item label="50" value={50} />
            </Picker>
          </View>
    
          <TouchableOpacity onPress={() => { setShowStartScreen(false); setIsTimerActive(true); }}>
            <Image
              source={require('@/assets/PLAY1.png')} // Replace with your "Start Quiz" button image
              style={styles.startBtnImage}
            />
          </TouchableOpacity>

        
  {/* Add an Image */}
  <TouchableOpacity onPress={() => setIsCreatorModalVisible(true)} activeOpacity={0.8}>
 
  <Image
    source={require('@/assets/CREDITSS.png')} // Replace with your image path
    style={styles.creatorBtnImage}
  />
  <Text style={styles.creatorBtnText}>About Creator</Text>
</TouchableOpacity>

{/* Creator Modal */}
<Modal visible={isCreatorModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          {/* Image Background */}
         
            <View style={styles.modalContent}>
            
              <Text style={styles.modalHeading}>Binoy Quiz Creator</Text>

              {/* Scrollable content */} 
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Person 1 */}
                <View style={styles.namesContainer}>
                  <Image
                    source={require('@/assets/re.jpg')} // Replace with image path for Jabonete, AprilBoy A.
                    style={styles.creatorImage}
                  />
                  <Text style={styles.boldText}>Jabonete, AprilBoy A.</Text>
                </View>

                {/* Person 2 */}
                <View style={styles.namesContainer}>
                  <Image
                    source={require('@/assets/se.jpg')} // Replace with image path for Jabonete, B. Angel
                    style={styles.creatorImage}
                  />
                  <Text style={styles.boldText}>Jabonete, B. Angel</Text>
                </View>

                {/* Person 3 */}
                <View style={styles.namesContainer}>
                  <Image
                    source={require('@/assets/pp.jpg')} // Replace with image path for Sena, JohnFranco
                    style={styles.creatorImage}
                  />
                  <Text style={styles.boldText}>Sena, JohnFranco</Text>
                </View>

                {/* Person 4 */}
                <View style={styles.namesContainer}>
                  <Image
                    source={require('@/assets/po.jpg')} // Replace with image path for Labitoria, Jobert
                    style={styles.creatorImage}
                  />
                  <Text style={styles.boldText}>Labitoria, Jobert</Text>
                </View>

                {/* Person 5 */}
                <View style={styles.namesContainer}>
                  <Image
                    source={require('@/assets/bb.jpg')} // Replace with image path for Pajanilan, Dariel
                    style={styles.creatorImage}
                  />
                  <Text style={styles.boldText}>Pajanilan, Dariel</Text>
                </View>

                <Text style={styles.modalText}>Contact: jaboneteaprilboy8@gmail.com</Text>
              </ScrollView>

              <TouchableOpacity
                onPress={() => setIsCreatorModalVisible(false)}
                style={styles.closeModalBtn}
              >
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
            </View>
           
        </View>
      </Modal>

        </View>
      </ImageBackground>
    );
  }

  if (showResult) {
    return <Results restart={restart} score={score} totalQuestions={questions?.length} />;
  }

  return (<ImageBackground
    source={require('@/assets/hehe.png')} // Replace with your image path
    style={styles.backgroundImage}
  >
    <View style={styles.backgroundImage}>
  {/* Replace Text with Image */}
  <Image
    source={require('@/assets/ion.png')} // Replace with your image path
    style={styles.topImage}
  />

      <StatusBar style="auto" />
      <SafeAreaView>
        <View style={styles.countwrapper}>
          <Text style={{ fontWeight: "600" }}>{currentQuestionIndex + 1}/{questions?.length}</Text>
        </View>

        <View style={styles.questionwrapper}>
          <View style={styles.progresswrapper}>
            <View style={[styles.progressBar, { width: `${percentageComplete}%` }]}></View>
            <View style={styles.progresscount}>
              <Text style={styles.percentage}>{percentageComplete.toFixed(0)}%</Text>
            </View>
          </View>

          <Text style={{ fontWeight: "500", textAlign: "center" }}>
            {currentQuestion?.question}
          </Text>
        </View>

        <View style={styles.optionswrapper}>
          <Option setSelectedOption={setSelectedOption} checkIfSelected={checkOptionOne} isSelected={checkIfSelected.option1} option={currentQuestion?.options[0]} />
          <Option setSelectedOption={setSelectedOption} checkIfSelected={checkOptionTwo} isSelected={checkIfSelected.option2} option={currentQuestion?.options[1]} />
          <Option setSelectedOption={setSelectedOption} checkIfSelected={checkOptionThree} isSelected={checkIfSelected.option3} option={currentQuestion?.options[2]} />
          <Option setSelectedOption={setSelectedOption} checkIfSelected={checkOptionFour} isSelected={checkIfSelected.option4} option={currentQuestion?.options[3]} />
        </View>

        <TouchableOpacity onPress={handleNext} activeOpacity={0.8} >
  <Image
    source={require('@/assets/next.png')} // Replace with the actual path to your image
    style={styles.nextBtnImage}
  />
</TouchableOpacity>
      </SafeAreaView>

      {/* Timer display on top-left */}
      <View style={styles.timerWrapper}>
        <Text style={styles.timerText}>{timeLeft}s</Text>
      </View>
    </View></ImageBackground>
  );
}

const primaryColor = '#004643';
const secondaryColor = '#00A676';
const lightColor = '#D1F0E1';
const textColor = '#000';
const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 6,
  elevation: 5, // For Android
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    padding: 20,
  },
  nextBtnImage: {
    width: 180, // Adjust the width as needed
    height: 80, // Adjust the height as needed
    resizeMode: 'contain',
    left: 45, // Ensures the image scales properly
  },
  countwrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  questionwrapper: {
    marginTop: 20,
    width: '100%',
    height: 180,
    borderRadius: 16,
    backgroundColor: 'white',
    padding: 16,
    ...shadowStyle,
    alignItems: 'center',
  },
  progresswrapper: {
    width: 80,
    height: 80,
    backgroundColor: 'purple',
    borderRadius: 50,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 30,
    marginTop: -50,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'lightblue',
    alignSelf: 'flex-end',
  },
  progresscount: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentage: {
    fontWeight: '600',
    fontSize: 18,
    color: primaryColor,
  },
  optionswrapper: {
    marginTop: 40,
    width: '100%',
  },

  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topImage: {
    width: 350, // Adjust based on your design
    height: 90,  // Adjust based on your design
    alignItems: 'center', // Ensures the image scales properly
    marginBottom: 1,
    right:30, // Add spacing below the image if needed
  },
  selectorContainer: {
    marginBottom: 10,
    width: '40%',
    alignItems: 'center',
  },
  selectorText: {
    fontSize: 10,
    marginVertical: 12,
    fontWeight: '600',
    color: textColor,
  },
  picker: {
    width: '100%',
    height: 50,
    bottom:30,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: primaryColor,
    color: primaryColor,
  },
  timerWrapper: {
    position: 'absolute',
    top: 120,
    right: 30,
    backgroundColor: 'lightblue', // A vibrant orange color for appeal
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    zIndex: 10,
    ...shadowStyle,
  },
  timerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1.5,
  },
 
  creatorBtnText: {
    color: 'black',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    ...shadowStyle,
  },
  modalHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
  },
  closeModalBtn: {
    backgroundColor: primaryColor,
    padding: 12,
    borderRadius: 12,
  },
  closeModalText: {
    color: 'white',
    fontWeight: '600',
  },
  boldText: {
    fontWeight: 'bold',
    color: primaryColor,
  },
 
  
  headingImage: {
    width:420, // Adjust size as needed
    height: 100, // Adjust size as needed
    marginBottom: 50,
    left:20,
  },
  
  selectorTextImage: {
    width: 150, // Adjust size as needed
    height: 60, // Adjust size as needed
    marginBottom: 10,
  },

  startBtnImage: {
    width: 200, // Adjust size as needed
    height: 100,
    marginTop: 80, // Adjust size as needed
  },
  creatorBtnImage: {
    width: 40,
    height: 40,
  left: 25, 
  marginTop: 30,// Adds spacing between the image and the text
  },

  selectorContainer: {
    flexDirection: 'column', // Align items vertically (stacked)
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    marginVertical: 20, // Vertical spacing from other components
    paddingHorizontal: 15, // Horizontal padding for inner spacing
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slight transparency for the background
    borderRadius: 10, // Rounded corners for a soft, modern look
    shadowColor: '#000', // Subtle shadow to give depth
    shadowOffset: { width: 0, height: 4 }, // Offset shadow for a floating effect
    shadowOpacity: 0.1, // Light opacity for the shadow
    shadowRadius: 6, // Soft edges for the shadow
    elevation: 5, // For Android, to apply the shadow effect
    width: '80%', // Use 80% of the screen width (adjustable)
    maxWidth: 350, // Maximum width to avoid too wide on larger screens
    minWidth: 250, // Minimum width for smaller screens
  },
 
  scrollContainer: {
    paddingBottom: 20, // Ensure content doesn't get cut off at the bottom
  },
  namesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  creatorImage: {
    width: 40, // Set the size for the image
    height: 50, // Set the size for the image
    borderRadius: 15, // Optionally add a circular shape
    marginRight: 10, // Space between the image and text
  },
  quoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555', // Color for the quote text
    marginBottom: 10, // Space between quotes
    marginLeft: 40, // Align quote text with the name text
  },
  
  imagebaba:{
    flex: 1,
    resizeMode: 'cover', // Ensures the image fills the background
    justifyContent: 'center',
    padding:10,
  },
  introWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30, // Increased padding for a balanced layout
    paddingVertical: 20,
     // Subtle overlay for contrast against the background
    borderRadius: 10, // Rounded corners for a modern look
  },
  introMessage: {
    fontSize: 20, // Slightly larger text for better readability
    fontWeight: '700', // Bolder weight for emphasis
    color: '#333', // Softer black for a more polished appearance
    textAlign: 'center',
    lineHeight: 26, // Increased line height for better readability
    marginBottom: 20, // Space between the message and the next element
  },
  startButtonWrapper: {
    backgroundColor: '#028A5E', // Slightly darker green for a richer appearance
    paddingVertical: 15, // Increased padding for a more prominent button
    paddingHorizontal: 30, // Larger clickable area
    borderRadius: 12, // Slightly more rounded corners
    shadowColor: '#000', // Add subtle shadow for a 3D effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android shadow effect
  },
  startButton: {
    fontSize: 20, // Larger text for better visibility
    fontWeight: '700',
    color: '#fff', // White text for better contrast
    textAlign: 'center',
  },
  introBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover', // Ensures the image scales appropriately
    backgroundColor: '#f2f2f2', // Fallback color in case the image doesn't load
  },
  additionalText: {
    fontSize: 18, // Slightly larger text for supplementary instructions
    fontWeight: '400', // Lighter weight for differentiation from the main message
    color: '#555', // Neutral gray for subtlety
    textAlign: 'center',
    lineHeight: 24, // Increased line height for better readability
    marginTop: 20, // Adds space above this block
  },
  modalBackground:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


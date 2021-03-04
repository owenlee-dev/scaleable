import React, {useContext} from 'react';
import {Text, View, ImageBackground, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppContext} from '../AppContext';
import {Images} from '../assets/images/Images';
import {
  accentColor,
  backgroundColor,
  primaryColor,
  secondaryColor,
  textColor,
} from '../assets/Styles';
import {getRenderScale} from '../tools/ScaleTools';

//component to generate triad image for learn tab
const TriadGenerator = (props) => {
  const {triad} = props;
  const {currentScale, currentKey} = useContext(AppContext);

  const renderNotes = getRenderScale(
    triad,
    currentScale.fretNumber,
    currentKey.includes('m'),
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.triadClosed}
        style={styles.image}></ImageBackground>
      {renderNotes.map((note, index) => {
        return (
          <Icon
            name="circle"
            key={Math.random() * 1}
            size={10}
            color="black"
            style={styles[note]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    height: 80,
    padding: 5,
    marginRight: 5,
  },
  image: {
    position: 'relative',
    width: '95%',
    height: '100%',
  },
  eOne: {
    position: 'absolute',
    left: '8%',
    top: '1%',
  },
  eTwo: {position: 'absolute', left: '23%', top: '1%'},
  eThree: {position: 'absolute', left: '37%', top: '1%'},
  eFour: {position: 'absolute', left: '52%', top: '1%'},
  eFive: {position: 'absolute', left: '66%', top: '1%'},
  eSix: {position: 'absolute', left: '81%', top: '1%'},
  bOne: {
    position: 'absolute',
    left: '8%',
    top: '21%',
  },
  bTwo: {position: 'absolute', left: '23%', top: '21%'},
  bThree: {position: 'absolute', left: '37%', top: '21%'},
  bFour: {position: 'absolute', left: '52%', top: '21%'},
  bFive: {position: 'absolute', left: '66%', top: '21%'},
  bSix: {position: 'absolute', left: '81%', top: '21%'},
  gOne: {
    position: 'absolute',
    left: '8%',
    top: '42%',
  },
  gTwo: {position: 'absolute', left: '23%', top: '42%'},
  gThree: {position: 'absolute', left: '37%', top: '42%'},
  gFour: {position: 'absolute', left: '52%', top: '42%'},
  gFive: {position: 'absolute', left: '66%', top: '42%'},
  gSix: {position: 'absolute', left: '81%', top: '42%'},
  dOne: {
    position: 'absolute',
    left: '8%',
    top: '62%',
  },
  dTwo: {position: 'absolute', left: '23%', top: '62%'},
  dThree: {position: 'absolute', left: '37%', top: '62%'},
  dFour: {position: 'absolute', left: '52%', top: '62%'},
  dFive: {position: 'absolute', left: '66%', top: '62%'},
  dSix: {position: 'absolute', left: '81%', top: '62%'},
  aOne: {
    position: 'absolute',
    left: '8%',
    top: '82%',
  },
  aTwo: {position: 'absolute', left: '23%', top: '82%'},
  aThree: {position: 'absolute', left: '37%', top: '82%'},
  aFour: {position: 'absolute', left: '52%', top: '82%'},
  aFive: {position: 'absolute', left: '66%', top: '82%'},
  aSix: {position: 'absolute', left: '81%', top: '82%'},
  EOne: {
    position: 'absolute',
    left: '8%',
    top: '99%',
  },
  ETwo: {position: 'absolute', left: '23%', top: '99%'},
  EThree: {position: 'absolute', left: '37%', top: '99%'},
  EFour: {position: 'absolute', left: '52%', top: '99%'},
  EFive: {position: 'absolute', left: '66%', top: '99%'},
  ESix: {position: 'absolute', left: '81%', top: '99%'},
  open: {position: 'absolute', left: '400%'},
});
export default TriadGenerator;

import React, {useState, useRef, useContext, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import {AppContext} from '../AppContext';
import BottomTabNavigation from '../components/BottomTabNavigation';
import ScaleGenerator from '../components/ScaleGenerator';
import {
  accentColor,
  backgroundColor,
  playBackgroundColor,
  primaryColor,
  mainBorderRadius,
  secondaryColor,
  textColor,
  mainFont,
} from '../assets/Styles';
import {Images} from '../assets/images/Images';
import {
  getNotesInScale,
  getScaleDescription,
  getScaleTips,
} from '../tools/ScaleTools';
import TriadGenerator from '../components/TriadGenerator';

import {
  getTriadNeckSlices,
  getSecond,
  getThird,
  getFifth,
  getFourth,
  getSixth,
  getSeventh,
} from '../tools/TriadTools';
const Learn = ({history}) => {
  const {tab, currentScale, currentKey, setTab} = useContext(AppContext);

  //get the notes in the scale
  const getScaleNotesHandler = () => {
    const notesInScale = getNotesInScale(
      currentScale.name,
      currentKey,
      currentScale.isMinor,
    );
    let noteString = '';
    for (let i = 0; i < notesInScale.length; i++) {
      if (i === notesInScale.length - 1) {
        noteString += notesInScale[i];
        break;
      }
      noteString += notesInScale[i] + ', ';
    }
    return noteString;
  };

  const Item = ({triad}) => {
    return (
      <View style={styles.triadContainer}>
        <TriadGenerator triad={triad} />
      </View>
    );
  };
  const renderItem = ({item}) => {
    return <Item triad={item.triad} />;
  };

  const triadSection = () => {
    const oneChordTriads = getTriadNeckSlices(currentScale, currentKey);
    const twoChordTriads = getTriadNeckSlices(
      currentScale,
      getSecond(currentKey),
    );
    const threeChordTriads = getTriadNeckSlices(
      currentScale,
      getThird(currentKey),
    );
    const fourChordTriads = getTriadNeckSlices(
      currentScale,
      getFourth(currentKey),
    );
    const fiveChordTriads = getTriadNeckSlices(
      currentScale,
      getFifth(currentKey),
    );
    const sixChordTriads = getTriadNeckSlices(
      currentScale,
      getSixth(currentKey),
    );
    const sevenChordTriads = getTriadNeckSlices(
      currentScale,
      getSeventh(currentKey),
    );
    let ONE_CHORD_DATA = [];
    let TWO_CHORD_DATA = [];
    let THREE_CHORD_DATA = [];
    let FOUR_CHORD_DATA = [];
    let FIVE_CHORD_DATA = [];
    let SIX_CHORD_DATA = [];
    let SEVEN_CHORD_DATA = [];

    for (let i = 0; i < oneChordTriads.length; i++) {
      ONE_CHORD_DATA.push({triad: oneChordTriads[i]});
    }
    for (let i = 0; i < fourChordTriads.length; i++) {
      FOUR_CHORD_DATA.push({triad: fourChordTriads[i]});
    }
    for (let i = 0; i < fiveChordTriads.length; i++) {
      FIVE_CHORD_DATA.push({triad: fiveChordTriads[i]});
    }
    for (let i = 0; i < twoChordTriads.length; i++) {
      TWO_CHORD_DATA.push({triad: twoChordTriads[i]});
    }
    for (let i = 0; i < threeChordTriads.length; i++) {
      THREE_CHORD_DATA.push({triad: threeChordTriads[i]});
    }
    for (let i = 0; i < sixChordTriads.length; i++) {
      SIX_CHORD_DATA.push({triad: sixChordTriads[i]});
    }
    for (let i = 0; i < sixChordTriads.length; i++) {
      SEVEN_CHORD_DATA.push({triad: sixChordTriads[i]});
    }
    return (
      <>
        <Text style={styles.secondaryTitle}>{currentKey} Triads (i chord)</Text>
        <FlatList
          horizontal
          data={ONE_CHORD_DATA}
          renderItem={renderItem}
          keyExtractor={() => Math.random() * 1}
        />
        <Text style={styles.secondaryTitle}>
          {getSecond(currentKey)} Triads (ii chord)
        </Text>
        <FlatList
          horizontal
          data={TWO_CHORD_DATA}
          renderItem={renderItem}
          keyExtractor={() => Math.random() * 1}
        />
        <Text style={styles.secondaryTitle}>
          {getThird(currentKey)} Triads (iii chord)
        </Text>
        <FlatList
          horizontal
          data={THREE_CHORD_DATA}
          renderItem={renderItem}
          keyExtractor={() => Math.random() * 1}
        />
        <Text style={styles.secondaryTitle}>
          {getFourth(currentKey)} Triads (iv chord)
        </Text>
        <FlatList
          horizontal
          data={FOUR_CHORD_DATA}
          renderItem={renderItem}
          keyExtractor={() => Math.random() * 1}
        />
        <Text style={styles.secondaryTitle}>
          {getFifth(currentKey)} Triads (v chord)
        </Text>
        <FlatList
          horizontal
          data={FIVE_CHORD_DATA}
          renderItem={renderItem}
          keyExtractor={() => Math.random() * 1}
        />
        <Text style={styles.secondaryTitle}>
          {getSixth(currentKey)} Triads (vi chord)
        </Text>
        <FlatList
          horizontal
          data={SIX_CHORD_DATA}
          renderItem={renderItem}
          keyExtractor={() => Math.random() * 1}
        />
        <Text style={styles.secondaryTitle}>
          {getSeventh(currentKey)} Triads (vii chord)
        </Text>
        <FlatList
          horizontal
          data={SEVEN_CHORD_DATA}
          renderItem={renderItem}
          keyExtractor={() => Math.random() * 1}
        />
      </>
    );
  };

  //learn tab with chosen scale
  const chosenScaleView = () => {
    return (
      <>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            Learn the{' '}
            <Text style={{color: accentColor}}>
              {currentKey} {currentScale.name}
            </Text>{' '}
            Scale
          </Text>
          <Text style={styles.titleText}>Position {currentScale.position}</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.contentContainer}>
          <View style={styles.scaleWrapper}>
            <Text> </Text>
            <ScaleGenerator
              key={Math.random() * 1}
              fretNumber={Math.abs(currentScale.fretNumber)}
              scale={currentScale.scale}
              isMinor={currentScale.isMinor}
              modified={currentScale.modified}
            />
            {currentScale.modified ? (
              <Text style={styles.fretNumberModified}>
                {currentScale.fretNumber * -1}
              </Text>
            ) : (
              <Text style={styles.fretNumber}>{currentScale.fretNumber}</Text>
            )}
          </View>
          <View style={styles.notes}>
            <Text style={styles.notesInScale}>
              Notes in scale: {getScaleNotesHandler()}
            </Text>
          </View>
          <View style={styles.scaleBlurb}>
            <Text style={styles.blurbText}>
              {getScaleDescription(currentScale.name, currentScale.isMinor)}
            </Text>
          </View>
          <View style={styles.scaleBlurb}>
            <Text style={styles.secondaryTitle}>Tips n Tricks</Text>
            <FlatList
              data={getScaleTips(currentScale.name, currentScale.isMinor)}
              renderItem={({item}) => (
                <Text style={styles.tip}>{item.tip}</Text>
              )}
            />
          </View>
          {triadSection()}
        </ScrollView>
      </>
    );
  };

  //learn tab with no chosen scale
  const noChosenView = () => {
    return (
      <View style={styles.noScale}>
        <Image style={styles.arrowImage} source={Images.arrow}></Image>
        <Text style={styles.noScaleText}>
          Search a Song {'\n'}
          or Key to Learn
        </Text>
      </View>
    );
  };

  const slideValue = new Animated.Value(0);
  const slideIn = slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });
  const slideOut = slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  });

  useEffect(() => {
    if (tab === 'learn') {
      Animated.timing(slideValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true, // To make use of native driver for performance
      }).start();
    } else {
      Animated.timing(slideValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true, // To make use of native driver for performance
      }).start();
      setTimeout(() => history.push('/'));
    }
  }, [tab]);

  return (
    <View style={styles.container}>
      <Header history={history} />
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              tab === 'learn' ? {translateX: slideIn} : {translateX: slideOut},
            ],
          },
        ]}>
        {currentScale.scale ? chosenScaleView() : noChosenView()}
      </Animated.View>
      <BottomTabNavigation history={history} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: playBackgroundColor,
    alignItems: 'center',
    width: '100%',
  },
  contentContainer: {
    paddingTop: 10,
    width: '90%',
  },
  triadContainer: {
    flex: 1,
    marginRight: 5,
    marginBottom: 20,
  },
  noScale: {
    backgroundColor: 'transparent',
    width: '100%',
    flex: 1,
  },
  arrowImage: {
    height: 144,
    width: 160,
    marginTop: 5,
    marginRight: 20,
    alignSelf: 'flex-end',
    transform: [{rotate: '-70deg'}],
  },
  noScaleText: {
    fontFamily: mainFont,
    paddingLeft: 15,
    fontSize: 25,
    letterSpacing: 1.5,
  },
  title: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    borderBottomWidth: 2,
    borderColor: accentColor,
    backgroundColor: backgroundColor,
    borderRadius: mainBorderRadius,
  },
  titleText: {
    color: textColor,
    fontFamily: mainFont,
    fontSize: 22,
  },
  scaleWrapper: {
    backgroundColor: 'white',
    borderRadius: mainBorderRadius,
    borderColor: accentColor,
    shadowOffset: {width: 1, height: 1},
    shadowColor: textColor,
    shadowOpacity: 0.3,
    elevation: 6,
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    borderWidth: 1,
  },
  fretNumberModified: {
    left: '29%',
    top: '3%',
    fontSize: 16,
    fontFamily: mainFont,
    color: textColor,
  },
  fretNumber: {
    left: '17%',
    top: '3%',
    margin: 0,
    fontSize: 16,
    fontFamily: mainFont,
    color: textColor,
  },
  notes: {
    paddingTop: 15,
    paddingHorizontal: 5,
  },
  notesInScale: {
    color: textColor,
    fontFamily: mainFont,
    fontWeight: 'bold',
    fontSize: 18,
  },
  scaleBlurb: {
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  blurbText: {
    fontSize: 16,
    fontFamily: mainFont,
    lineHeight: 20,
    color: textColor,
  },
  secondaryTitle: {
    fontSize: 26,
    fontFamily: mainFont,
    color: textColor,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  item: {
    backgroundColor: primaryColor,
    width: 200,
    height: 200,
    borderRadius: mainBorderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 15,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: mainFont,
  },
  tip: {
    padding: 10,
    fontSize: 16,
    margin: 3,
    fontFamily: mainFont,
    backgroundColor: 'white',
    borderRadius: mainBorderRadius,
    borderColor: accentColor,
    shadowOffset: {width: 1, height: 1},
    shadowColor: textColor,
    shadowOpacity: 0.3,
    elevation: 3,
  },
});

export default Learn;

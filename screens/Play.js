import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Animated,
  FlatList,
  Pressable,
} from 'react-native';
import Header from '../components/Header';
import {AppContext} from '../AppContext';
import BottomTabNavigation from '../components/BottomTabNavigation';
import ScaleCard from '../components/ScaleCard';
import scales from '../assets/scales.json';
import {
  splitScale,
  transposeSlices,
  transposeScale,
  getNotesInScale,
} from '../tools/ScaleTools';
import {
  accentColor,
  backgroundColor,
  playBackgroundColor,
  primaryColor,
  mainFont,
  textColor,
} from '../assets/Styles';
import {Images} from '../assets/images/Images';

//TODO add open position scales
const Play = ({history}) => {
  const {chosen, currentKey, tab} = useContext(AppContext);

  let splitScales = [];
  let startFrets = [];
  let names = [];
  let positions = [];
  const [filter, setFilter] = useState('Pentatonic');

  //prettier-ignore
  let DATA = null;
  //hard coded scales at top = messy and gross :(
  if (chosen && currentKey.includes('m')) {
    DATA = [
      {title: 'Pentatonic'},
      {title: 'Blues'},
      {title: 'Dorian'},
      {title: 'Phrygian'},
      {title: 'Aeolian'},
      {title: 'Locrian'},
    ];
  } else {
    DATA = [
      {title: 'Pentatonic'},
      {title: 'Blues'},
      {title: 'Ionian'},
      {title: 'Lydian'},
      {title: 'Mixolydian'},
    ];
  }

  if (chosen) {
    for (let i = 0; i < scales.scales.length; i++) {
      // transpose scale to new key
      const transposedScale = transposeScale(
        scales.scales[i].scale,
        currentKey,
      );
      //transpose slices
      const slices = transposeSlices(scales.scales[i].slices, currentKey);

      //slice scale into smaller scales
      const splitScaleObject = splitScale(transposedScale, slices);
      splitScales = splitScales.concat(splitScaleObject.splitScales);
      startFrets = startFrets.concat(splitScaleObject.startFrets);

      //build arrays for acompanying scale information
      for (let j = 0; j < 10; j++) {
        names.push(scales.scales[i].name);
        positions.push(j + 1);
      }
    }
  }

  const songHeader = () => {
    return (
      <View style={styles.chosenSong}>
        <View style={styles.chosenLeft}>
          <Text style={styles.chosenSongKey}>{currentKey}</Text>
        </View>
        <View style={styles.chosenRight}>
          {chosen.title.length <= 22 && (
            <Text style={styles.chosenTitle}>{chosen.title}</Text>
          )}
          {chosen.title.length > 22 && chosen.title.length <= 27 && (
            <Text style={styles.chosenTitleSmall}>{chosen.title}</Text>
          )}
          {chosen.title.length > 27 && (
            <Text style={styles.chosenTitleSmaller}>{chosen.title}</Text>
          )}
          <Text style={styles.chosenArtist}>{chosen.artist.name}</Text>
        </View>
      </View>
    );
  };

  const keyHeader = () => {
    return (
      <View style={styles.chosenKey}>
        <View>
          <Text style={styles.chosenTitle}>Key of {chosen}</Text>
        </View>
      </View>
    );
  };
  const Item = ({title}) => {
    let filterStyle = 'filterItem';
    if (title === filter) {
      filterStyle = 'filterItemActive';
    }
    return (
      <View style={styles.item}>
        <Pressable style={styles[filterStyle]} onPress={() => setFilter(title)}>
          <Text style={styles.filterItemTitle}>{title}</Text>
        </Pressable>
      </View>
    );
  };
  const renderItem = ({item}) => <Item title={item.title} />;
  const scaleFilter = () => {
    return (
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={() => Math.random() * 1}
        />
      </View>
    );
  };

  //slide animations
  const slideValue = new Animated.Value(0);
  const slideIn = slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-500, 0],
  });
  const slideOut = slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -500],
  });

  useEffect(() => {
    if (tab === 'play') {
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
      setTimeout(() => history.push('/learn'), 0);
    }
  }, [tab]);

  // render all scales that need to be rendered
  return (
    <View style={styles.container}>
      <Header history={history} />
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              tab === 'play' ? {translateX: slideIn} : {translateX: slideOut},
            ],
          },
        ]}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
          {chosen && chosen.id && songHeader()}
          {chosen && !chosen.id && keyHeader()}
          {chosen && scaleFilter()}
          {chosen &&
            splitScales.map((scale, index) => {
              if (filter === names[index]) {
                return (
                  <ScaleCard
                    fretNumber={startFrets[index]}
                    name={names[index]}
                    position={positions[index]}
                    history={history}
                    scale={scale}
                    key={Math.random() * 1}
                  />
                );
              }
            })}
          {!chosen && (
            <Image
              style={{width: 400, height: 400}}
              source={Images.scaleAble}></Image>
          )}
        </ScrollView>
      </Animated.View>
      <BottomTabNavigation history={history} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: playBackgroundColor,
    width: '100%',
  },
  chosenSong: {
    top: 0,
    flexDirection: 'row',
    height: '3%',
    borderBottomWidth: 2,
    width: '100%',
    borderColor: accentColor,
  },
  chosenLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColor,
    borderColor: accentColor,
    borderRightWidth: 2,
  },
  chosenRight: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColor,
  },
  chosenTitle: {
    fontFamily: mainFont,
    color: textColor,
    fontSize: 28,
  },
  chosenTitleSmall: {
    fontFamily: mainFont,
    color: textColor,
    fontSize: 24,
  },
  chosenTitleSmaller: {
    fontFamily: mainFont,
    color: textColor,
    fontSize: 20,
  },
  chosenArtist: {
    fontFamily: mainFont,
  },
  chosenSongKey: {
    fontSize: 28,
    color: textColor,
    fontFamily: mainFont,
  },
  chosenKey: {
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColor,
    height: 75,
    width: '100%',
    borderBottomWidth: 2,
    borderColor: accentColor,
  },
  filterItem: {
    borderWidth: 1,
    width: 100,
    padding: 5,
    borderColor: accentColor,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    marginTop: 10,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  filterItemActive: {
    borderWidth: 1,
    width: 100,
    padding: 5,
    borderColor: accentColor,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    marginTop: 10,
    borderRadius: 100,
    backgroundColor: primaryColor,
  },
  filterItemTitle: {fontFamily: mainFont, color: textColor},
  list: {width: '100%'},
});

export default Play;

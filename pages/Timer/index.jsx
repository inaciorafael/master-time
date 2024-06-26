import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useRoute } from "@react-navigation/native";
import { s } from "react-native-size-matters";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Audio } from "expo-av";

import styles from "./styles";
import { globalStyles, theme } from "../../styles";
import useStore from "../../store";
import { FORMAT } from "../../utils";

const GREEN = 0;
const YELLOW = 1;
const RED = 2;

const Timer = () => {
  const { params } = useRoute();
  const { changeCurrentTimerId } = useStore((state) => state);

  const progressAnimate = useRef(new Animated.Value(0)).current;
  const progressColor = useRef(new Animated.Value(GREEN)).current;

  const [upTime, setUpTime] = useState(
    params.upTime.minutes * 60 + params.upTime.seconds,
  );
  const [restTime, setRestTime] = useState(
    params.restTime.minutes * 60 + params.restTime.seconds,
  );
  const [timerStatus, setTimerStatus] = useState("paused"); // paused | playing
  const [timerType, setTimerType] = useState("uptime"); // uptime | rest
  const [round, setRound] = useState(1);
  const [activeSound, setActiveSound] = useState();
  const [restSound, setRestSound] = useState();

  useEffect(() => {
    changeCurrentTimerId(params.id);
  }, []);

  useEffect(() => {
    const percent =
      ((((params.upTime.seconds || params.upTime.minutes * 60) - upTime) /
        (params.upTime.seconds || params.upTime.minutes * 60)) *
        100) /
      100;

    if (upTime <= 10) {
      Animated.timing(progressColor, {
        toValue: YELLOW,
        duration: 1000,
      }).start();

      if (upTime === 0) {
        Animated.timing(progressColor, {
          toValue: RED,
          duration: 1000,
        }).start();
      }
    } else {
      Animated.timing(progressColor, {
        toValue: GREEN,
        duration: 100,
      }).start();
    }

    Animated.timing(progressAnimate, {
      toValue: percent,
      duration: 0,
    }).start();
  }, [upTime]);

  useEffect(() => {
    const percent =
      ((((params.restTime.seconds || params.restTime.minutes * 60) - restTime) /
        (params.restTime.seconds || params.restTime.minutes * 60)) *
        100) /
      100;

    if (restTime <= 10) {
      Animated.timing(progressColor, {
        toValue: YELLOW,
        duration: 0,
      }).start();

      if (restTime === 0) {
        Animated.timing(progressColor, {
          toValue: RED,
          duration: 1000,
        }).start();
      }
    } else {
      Animated.timing(progressColor, {
        toValue: GREEN,
        duration: 1000,
      }).start();
    }

    Animated.timing(progressAnimate, {
      toValue: percent,
      duration: 100,
      // useNativeDriver: true,
    }).start();
  }, [restTime]);

  useEffect(() => {
    if (timerStatus === "playing") {
      var interval = setInterval(() => {
        if (timerType === "uptime") {
          setUpTime((prevState) => prevState - 1);
        }

        if (timerType === "rest") {
          setRestTime((prevState) => prevState - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerStatus, timerType]);

  const playStartTimerSong = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/boxing-bell-1.mp3"),
    );

    setActiveSound(sound);

    await sound.playAsync();
    setTimeout(() => {
      sound.unloadAsync();
    }, 2000);
  };

  const playAlertTimerSong = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/boxing-bell-3.mp3"),
    );

    setRestSound(sound);

    await sound.playAsync();
    setTimeout(() => {
      sound.unloadAsync();
    }, 2000);
  };

  useEffect(() => {
    if (upTime === 10 && timerType === "uptime") {
      playAlertTimerSong();
    }

    if (restTime === 10 && timerType === "rest") {
      playAlertTimerSong();
    }

    if (upTime === 0) {
      setTimerStatus("paused");
      playStartTimerSong();

      setTimeout(() => {
        setUpTime(params.upTime.minutes * 60 + params.upTime.seconds);
        setTimerStatus("playing");
        setTimerType("rest");
      }, 5000);
    }

    if (restTime === 0) {
      setTimerStatus("paused");
      playStartTimerSong();

      setTimeout(() => {
        setRestTime(params.restTime.minutes * 60 + params.restTime.seconds);
        setTimerStatus("playing");
        setRound((prevState) => prevState + 1);
        setTimerType("uptime");
      }, 5000);
    }
  }, [upTime, restTime]);

  const handleResetTimer = () => {
    setUpTime(params.upTime.minutes * 60 + params.upTime.seconds);
    setRestTime(params.restTime.minutes * 60 + params.restTime.seconds);
    setTimerStatus("paused");
    setTimerType("uptime");
    setRound(1);
  };

  const getTimer = (type) => {
    if (type === "minutes") {
      if (timerType === "uptime") {
        return FORMAT.secondsToTime(upTime).replace(/:.*/g, "");
      }

      return FORMAT.secondsToTime(restTime).replace(/:.*/g, "");
    }

    if (type === "seconds") {
      if (timerType === "uptime") {
        return FORMAT.secondsToTime(upTime).replace(/^.*:/g, "");
      }

      return FORMAT.secondsToTime(restTime).replace(/^.*:/g, "");
    }
  };

  const isCurrentTimerActive = (type) => {
    if (type === timerType) {
      return true;
    }

    if (type === timerType) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    return restSound
      ? () => {
        restSound.unloadAsync();
      }
      : undefined;
  }, [restSound]);

  useEffect(() => {
    return activeSound
      ? () => {
        activeSound.unloadAsync();
      }
      : undefined;
  }, [activeSound]);

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.roundTitle}>
          <Text style={{ fontSize: s(60), fontWeight: "bold" }}>
            {round}
            {timerType === "rest" ? `|${round + 1}` : null}º
          </Text>{" "}
          Round
        </Text>
        <Text style={styles.timer}>
          {getTimer("minutes")}
          <Text style={styles.timerDots}>:</Text>
          {getTimer("seconds")}
        </Text>
        <View style={{ flexDirection: "row", gap: s(20) }}>
          <Text
            style={{
              ...styles.timerInTraining,
              backgroundColor: theme.trafficLightInTraining,
              opacity: isCurrentTimerActive("uptime") ? 1 : 0.2,
            }}
          >
            Em treino
          </Text>
          <Text
            style={{
              ...styles.timerInTraining,
              backgroundColor: theme.trafficLightInAtRest,
              opacity: isCurrentTimerActive("rest") ? 1 : 0.2,
            }}
          >
            Em descanso
          </Text>
        </View>
      </View>

      <Animated.View
        style={{
          backgroundColor: progressColor.interpolate({
            inputRange: [GREEN, YELLOW, RED],
            outputRange: ["#4CAF50", "#FFEB3B", "red"],
          }),
          height: s(100),
          width: progressAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
          }),
        }}
      ></Animated.View>

      <View style={styles.controlContainer}>
        <View style={{ flex: 1, ...globalStyles.center }}></View>
        <View style={{ flex: 1, ...globalStyles.center }}>
          {timerStatus === "paused" ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  playStartTimerSong();
                  setTimeout(() => {
                    setTimerStatus("playing");
                  }, 1000);
                }}
              >
                <FontAwesome5
                  name="play"
                  size={s(60)}
                  color={theme.primaryColor}
                />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => setTimerStatus("paused")}
              style={styles.playPauseControlButtonContainer}
            >
              <FontAwesome
                name="pause"
                size={s(50)}
                color={theme.primaryColor}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ flex: 1, ...globalStyles.center }}>
          <TouchableOpacity
            onPress={handleResetTimer}
            style={{ ...globalStyles.center }}
            hitSlop={{ top: s(20), right: s(20), left: s(20), bottom: s(20) }}
          >
            <MaterialCommunityIcons
              name="restart"
              size={s(30)}
              color={theme.primaryColor}
            />
            <Text style={styles.controlDetail}>Recomeçar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Timer;
